import { useReducer, useEffect, useState } from 'react';
import './index.css';
import PageTemplate from 'global-components/page-template';
import LazyLoad from 'global-components/lazyload';
import PhotoUpload from './photoupload';
import QUESTION_OBJ from './data';
import InputForm from './inputform';
import TextEditor from './editor';
import axios from 'axios';

const ACTION_TYPE = {
  RENDER: 'render',
  UNRENDER: 'unrender',
  INIT: 'initialise',
  FETCH: 'fetch',
};

function sort(array) {
  return array.sort((a, b) => a.id - b.id);
}

function checkForDuplicates(array) {
  let newArray = [];
  let i = 0;
  while (i < array.length - 1) {
    if (array[i].id - array[i + 1].id === 0) {
      newArray = [...newArray, array[i].id];
    }
    i++;
  }
  return Boolean(newArray.length);
}

function filterDependents(data, inputName) {
  const input = data.find(elem => elem.name === inputName);
  if (!input) return [];
  return data.filter(({ dependent }) => dependent.parent === input.id);
}

function manipulateData(array, value = '') {
  return array.map(elem => {
    if (value) elem.parentValue = value;
    return elem;
  });
}

function hashDependents(dependents, value) {
  let noRenderIf = dependents.filter(({ render_if }) => !render_if);
  let passedTest = dependents.filter(({ render_if }) => {
    if (render_if) return render_if.find(elem => elem === value);
    return undefined;
  });
  return manipulateData([...noRenderIf, ...passedTest], value);
}

function updateForm(components, formData) {
  const {
    jsRaw = undefined,
    title = undefined,
    seo = undefined,
    ...rest
  } = formData;
  let propertyNames = components.map(({ name }) => name);
  let newFormData = {};
  for (const name of propertyNames) {
    let pair = Object.entries(rest).find(entry => entry[0] === name);
    if (pair) {
      const [key, value] = pair;
      if (value) newFormData = { ...newFormData, [key]: value };
    }
  }
  newFormData = { title, seo, ...newFormData, jsRaw };
  return newFormData;
}

function removeDependents(components, dependents) {
  return components.filter(a => !dependents.find(b => -a.id === -b.id));
}

function removeNoParents(components) {
  const withParent = components.filter(({ dependent }) => dependent.parent);
  for (const component of withParent) {
    const found = components.find(
      ({ id }) => -component.dependent.parent === -id
    );
    if (found) continue;
    const index = components.findIndex(({ id }) => -id === -component.id);
    components.splice(index, 1);
  }
  return components;
}

function reducer({ components, formData }, { action, payload }) {
  const { name, value, compObj, rest } = payload;
  if (action === ACTION_TYPE.INIT) {
    components = compObj;
    return { components, formData };
  }
  const datus = JSON.parse(sessionStorage.getItem('data'));
  if (action === ACTION_TYPE.FETCH) {
    const forms = Object.keys(rest);
    const inputArrays = datus.filter(
      data => data.name === forms.find(form => form === data.name)
    );
    const parents = inputArrays.filter(
      entry => entry.dependent.parent === undefined
    );
    for (const i of parents) {
      const dependents = inputArrays.filter(
        entry => entry.dependent.parent === i.id
      );
      if (dependents.length) {
        const value = rest[i.name];
        components = [...components, ...manipulateData(dependents, value)];
      }
    }
    components = [...parents, ...components];
    formData = rest;
    return { components, formData };
  }

  const dependents = filterDependents(datus, name);
  if (value instanceof Object && !(value instanceof Array)) {
    formData[name] = { ...formData[name], ...value };
  } else {
    formData[name] = value;
  }
  if (dependents.length) {
    if (action === ACTION_TYPE.RENDER) {
      components = removeDependents(components, dependents);
      components = removeNoParents(components);
      formData = updateForm(components, formData);
      components = [...components, ...hashDependents(dependents, value)];
    } else if (action === ACTION_TYPE.UNRENDER) {
      components = removeDependents(components, dependents);
      components = removeNoParents(components);
      formData = updateForm(components, formData);
    }
    components = components.sort((a, b) => a.id - b.id);
  } else {
    if (
      formData[name] instanceof Object &&
      !(formData[name] instanceof Array)
    ) {
      const property = Object.keys(value)[0];
      if (!formData[name][property].length) delete formData[name][property];
      if (!Object.keys(formData[name]).length) delete formData[name];
    } else {
      if (!formData[name].length) delete formData[name];
    }
  }
  return { components, formData };
}

function SubmitListing() {
  const [state, dispatch] = useReducer(reducer, {
    components: [],
    formData: {},
  });
  const [imgs /*setImgs*/] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  function handleChange({ target }) {
    const { name, value } = target;
    const action = !value ? ACTION_TYPE.UNRENDER : ACTION_TYPE.RENDER;
    dispatch({ action, payload: { name, value } });
  }

  function submit() {
    const { formData } = state;
    const formDataLen = Object.keys(formData).length;
    const imageFilesLen = imageFiles.length;
    const id = sessionStorage.getItem('AgQxFcvAH');
    const PayLoad = new FormData();

    if (formDataLen + imageFilesLen === 0) return;
    if (formDataLen) {
      for (const key in formData) {
        if (!formData[key]) continue;
        PayLoad.append(key, formData[key]);
      }
    }
    if (imageFilesLen) {
      for (let i = 0; i < imageFilesLen; i++) {
        PayLoad.append(`image${i + 1}`, imageFiles[i]);
      }
    }
    if (id) PayLoad.append('id', id);

    const config = {
      method: 'post',
      url: '/submitlisting/savedproperty',
      data: PayLoad,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    };
    axios(config)
      .then(res => {
        const { message } = res.data;
        console.log(message);
        let sortedArray = sort(QUESTION_OBJ);
        let hasDuplicates = checkForDuplicates(sortedArray);
        if (hasDuplicates) {
          throw new Error(
            `ERROR: Questions cannot be rendered similar id has found `
          );
        }
        sessionStorage.setItem('data', JSON.stringify(sortedArray));
        const noParent = sortedArray.filter(elem => !elem.dependent.parent);
        const compObj = manipulateData(noParent);
        dispatch({ action: ACTION_TYPE.INIT, payload: { compObj } });
      })
      .catch(err => console.log(err.message));
  }

  useEffect(() => {
    // const id = sessionStorage.getItem('AgQxFcvAH');
    // if (id) {
    //   fetch(`/submitlisting/api/${id}`, {
    //     method: 'GET',
    //     header: {
    //       Accept: 'application/json',
    //     },
    //   })
    //     .then(result => result.json())
    //     .then(data => {
    //       const { images = [], _id, ...rest } = data;
    //       setImgs(() => images);
    //       dispatch({ action: ACTION_TYPE.FETCH, payload: { rest } });
    //       if (_id) sessionStorage.setItem('AgQxFcvAH', _id);
    //     })
    //     .catch(err => console.log('error', err));
    // } else {
    let sortedArray = sort(QUESTION_OBJ);
    let hasDuplicates = checkForDuplicates(sortedArray);
    if (hasDuplicates) {
      throw new Error(
        `ERROR: Questions cannot be rendered similar id has found `
      );
    }
    sessionStorage.setItem('data', JSON.stringify(sortedArray));
    const noParent = sortedArray.filter(elem => !elem.dependent.parent);
    const compObj = manipulateData(noParent);
    dispatch({ action: ACTION_TYPE.INIT, payload: { compObj } });
    // }
  }, []);

  function inputChange(e) {
    const { id, value } = e.target;
    dispatch({ payload: { name: id, value } });
  }

  return (
    <PageTemplate className="submitlisting">
      <h1>Property Drafting Tool</h1>

      <div className="content">
        <section>
          <PhotoUpload
            meta={{ images: imgs, snippets: state.formData, setImageFiles }}
          />
          <div className="description">
            <div className="desc">
              <span className="question">Title</span>
              <input
                type="text"
                className="input"
                id="title"
                onChange={inputChange}
              />
            </div>
            <div className="desc">
              <span className="question">SEO</span>
              <input
                type="text"
                className="input"
                id="seo"
                onChange={inputChange}
              />
            </div>
            <TextEditor meta={{ dispatch }} />
          </div>
        </section>
        <div className="form">
          <button
            className="saved-button page-button primary no-select"
            onClick={submit}
          >
            Submit Property
          </button>
          {state.components.map(component => {
            const { name, id, question, ...rest } = component;
            return (
              <div key={id}>
                <span className="question no-select">{question}</span>
                <InputForm
                  meta={{
                    ...rest,
                    name,
                    value: state.formData[name],
                    handleChange,
                    dispatch,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </PageTemplate>
  );
}

export default LazyLoad(SubmitListing);

// AgQxFcvAH || 5f8e8abc4231d31090acec31
