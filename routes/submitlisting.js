const express = require('express');
const path = require('path');
const moongose = require('mongoose');
const Estate = require('../models/submitlisting');

const router = express.Router();

router.post('/savedproperty', (req, res) => {
  const estate = new Estate({
    _id: new moongose.Types.ObjectId(),
    ...req.body,
  });
  estate
    .save()
    .then(({ _id }) => res.status(201).json({ id: _id }))
    .catch((err) => console.log(err));
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
      file.mv(path.join('./', 'build', 'images', file.name));
    }
  }

  function respond(images, _id) {
    res.status(201).json({
      uploaded: images,
      id: _id,
      rejected: rejectedFiles ? rejectedFiles : undefined,
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
    const estate = new Estate({
      _id: new moongose.Types.ObjectId(),
      images: acceptedFilePath,
    });
    estate
      .save()
      .then((result) => {
        const { images, _id } = result;
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
