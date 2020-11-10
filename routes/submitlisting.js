const express = require('express');
const path = require('path');
const moongose = require('mongoose');
const { Estate, Image } = require('../models/submitlisting');

const router = express.Router();

const validate = require('../data-validation');

// utilities
require('../util');

// file path
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get Routes

const PUBLIC_FOLDER = './public';
// const PUBLIC_FOLDER = path.join(ROOTPATH, 'images');

router.get('/api/:id', async (req, res) => {
  try {
    const query = await Estate.findById(req.params.id).exec();
    const { createdAt, updatedAt, __v, ...rest } = query._doc;
    console.log(rest);
    res.status(200).json({
      ...rest,
      message: 'query accepted',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Oops! something went wrong.',
    });
  }
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Post Routes

router.post('/savedproperty', async (req, res) => {
  const { body, headers } = req;
  console.log('request received'.info, body);

  if (Object.keys(body).length === 0) {
    // Bad request if body has no content
    return res.status(400).json({ message: 'Bad Request' });
  }
  if (moongose.connection.readyState === 0) {
    // Internal Server error if db connection is null
    return res
      .status(500)
      .json({ message: 'Server lost connection with database' });
  }
  if (body.id) {
    try {
      // validates the request body and returns a promise
      // if request body contains unrecognized data
      // promise will be rejected else it will be resolved
      await validate.properties(body);
      const estate = await Estate.findById(body.id);
      estate.overwrite(body);
      await estate.save();
      return res.status(202).json({
        ...body,
        message: 'Successfully saved document',
      });
    } catch (err) {
      console.log(`${err.name} ${err.message}`.info);
      return res
        .status(202)
        .json({ message: 'Failed to saved try again later' });
    }
  } else {
    // validates the request body and returns a promise
    // if request body contains unrecognized data
    // promise will be rejected else it will be resolved
    console.log(validate);
    validate
      .properties(body)
      .then(data => {
        new Estate({
          _id: new moongose.Types.ObjectId(),
          ...data,
        })
          .save()
          .then(documents => {
            const { _id } = documents;
            // console.log(rest);
            return res
              .status(201)
              .json({ id: _id, ...data, message: 'Uploaded Successfully' });
          })
          .catch(err => {
            const { name, message } = err;
            console.log(`${name} ${message}`.error);
            return res
              .status(500)
              .json({ message: 'Uploaded failed try again later' });
          });
      })
      .catch(err => {
        // Bad Request if body contains unrecognized data
        const { name, message } = err;
        console.log(`${name} ${message}`.error);
        return res.status(400).json({ message: 'Bad Request' });
      });
  }
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// for uploading image
router.post('/uploadimage', async (req, res) => {
  const { files, body } = req;
  const userName = 'admin';

  // check if body contain files
  if (!files || Object.keys(files).length === 0) {
    // response bad request of body contains no files
    return res.status(400).json({ message: 'Bad request' });
  }

  if (moongose.connection.readyState === 0) {
    // Internal Server error if db connection is null
    return res
      .status(500)
      .json({ message: 'Server lost connection with database' });
  }

  // Code below for in loop used to test the eligibility of all files
  // It's all or nothing operation if any of the file doesn't passed the test
  // will response 400 bad request and will not upload anyone of the file

  // let fileImages = [];
  // let filePath = [];

  let fileImages = {};

  for (const prop in files) {
    // 97-122 charcode small case a -z
    // String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1) + 97))
    //
    //
    // only accept image file
    const image = /^image$/gi.test(files[prop].mimetype.split('/')[0]);
    // only accept .png and .jpeg file extension
    const split = files[prop].name.split('.');
    const ext = split[split.length - 1].match(/^png$|^jpe?g$/i);

    if (ext && image) {
      const num = Math.floor(Math.random() * 100 * Date.now());
      const fileName = `IMG_${num}.${ext}`;
      fileImages[prop] = {
        save: files[prop].mv,
        url: `images/${userName}/${fileName}`,
        path: `./images/${userName}/${fileName}`,
        name: files[prop].name.split('.')[0],
      };
    } else {
      console.log(`${files[prop].name} is not a valid file`);
      return res.status(400).json({ message: 'Bad Request' });
    }
  }
  const imgObj = Object.values(fileImages).map(({ url, name }) => ({
    url,
    name,
  }));

  if (body.id) {
    // To do if request body has id
    console.log('imgObj'.info, imgObj);

    try {
      const image = await Image.findById(body.id);
      image._id = body.id;
      image.imageUrls = [...image.imageUrls, ...imgObj];
      const save = await image.save();
      console.log('document'.info, save);
      for (const prop in fileImages) {
        fileImages[prop].save(path.join(fileImages[prop].path));
      }
      return res.status(202).json({
        id: save._id,
        images: imgObj,
        message: 'Uploaded Successfully',
      });
    } catch (err) {
      console.log(`${err.name} ${err.message}`);
      return res.status(500).json('Testing Purposes failed');
    }
  } else {
    // To do if request body has no id

    console.log('imgObj'.info, imgObj);
    try {
      const image = await new Image({
        _id: new moongose.Types.ObjectId(),
        imageUrls: imgObj,
      });
      const save = await image.save();
      console.log('document'.info, save);

      for (const prop in fileImages) {
        fileImages[prop].save(path.join(fileImages[prop].path));
      }
      return res.status(202).json({
        id: save._id,
        images: save.imageUrls,
        message: 'Uploaded Successfully',
      });
    } catch (err) {
      console.log(`${err.name} ${err.message}`);
      return res.status(500).json('Testing Purposes failed');
    }
  }
  return res.status(500).json({ message: 'End point reach' });
});

module.exports = router;
