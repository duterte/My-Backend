const express = require('express');
const path = require('path');
const moongose = require('mongoose');
const Estate = require('../models/submitlisting');

const router = express.Router();

// file path

const ROOTPATH = './public';
const PUBLICIMAGE = path.join(ROOTPATH, 'images');

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
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: 'Request body has no content' });
  }
  if (body.id) {
    const update = { ...body };
    Estate.findOneAndUpdate({ _id: body.id }, update, { new: true }, callback);
    function callback(err, result) {
      if (result) {
        console.log(result);
        res.status(202).json({ message: 'uploaded successfully' });
      } else {
        console.debug('error', err);
        res
          .status(500)
          .json({ id: _id, message: '1 Something went wrong from our end.' });
      }
    }
  } else {
    new Estate({
      _id: new moongose.Types.ObjectId(),
      ...req.body,
    })
      .save()
      .then(({ _id }) => {
        console.log(result);
        return res
          .status(201)
          .json({ id: _id, message: 'Uploaded Successfully' });
      })
      .catch((err) => console.log(err));
  }
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// for uploading image
router.post('/uploadimage', async (req, res) => {
  const { files, body } = req;

  if (!files || Object.keys(files).length === 0) {
    return res
      .status(400)
      .json({ message: 'Request body does not contain files' });
  }

  const extensions = ['png', 'jpg', 'jpeg'];
  let acceptedFiles = [];
  let rejectedFiles = [];
  let acceptedFilePath = [];
  for (const i in files) {
    let mimeType = files[i].mimetype.split('/')[0];
    let split = files[i].name.split('.');
    let fileExt = split[split.length - 1];
    let allowed = extensions.find((extension) => extension === fileExt);
    if (mimeType === 'image' && allowed) {
      acceptedFiles = [...acceptedFiles, files[i]];
      acceptedFilePath = [
        ...acceptedFilePath,
        { path: `images/${files[i].name}` },
      ];
    } else {
      rejectedFiles = [...rejectedFiles, files[i]];
    }
  }

  function moveFile() {
    for (const file of acceptedFiles) {
      file.mv(path.join(PUBLICIMAGE, file.name));
    }
  }

  function respond(images, _id) {
    return res.status(201).json({
      uploaded: images,
      id: _id,
      rejected: rejectedFiles.length ? rejectedFiles : undefined,
      message: 'Uploaded Successfully',
    });
  }

  const id = body.id;
  if (id) {
    // update image then return back the id
    const estate = await Estate.findOne({ _id: id });
    console.log(estate);
    const update = { images: [...estate.images, ...acceptedFilePath] };
    Estate.findOneAndUpdate({ _id: id }, update, { new: true }, callback);
    function callback(err, result) {
      if (result) {
        console.log(result);
        moveFile();
        respond(acceptedFilePath, result.id);
      } else {
        console.debug('error', err);
        res
          .status(500)
          .json({ message: '1 Something went wrong from our end.' });
      }
    }
  } else {
    // upload image then send id
    new Estate({
      _id: new moongose.Types.ObjectId(),
      images: acceptedFilePath,
    })
      .save()
      .then((result) => {
        const { images, _id } = result;
        console.log(result);
        moveFile();
        respond(images, _id);
      })
      .catch((err) => {
        console.debug('error', err);
        res
          .status(500)
          .json({ message: '2 Something went wrong from our end.' });
      });
  }
});

module.exports = router;
