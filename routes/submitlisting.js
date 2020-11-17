const express = require('express');
const path = require('path');
const moongose = require('mongoose');
const { Estate, Image } = require('../models/submitlisting');

const router = express.Router();

const validate = require('../data-validation');

// utilities
require('../util');

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Get Routes

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
  const { body, files } = req;
  const userName = 'admin';
  const requestBodyLength = Object.keys(body).length;
  const requestFilesLength = files ? Object.keys(files).length : 0;
  const requestLength = requestBodyLength + requestFilesLength;
  // console.log('request body'.info, body);
  // console.log('request files'.info, files);

  if (requestLength === 0) {
    // Bad request if body has no content
    return res.status(400).json({ message: 'Request Body is empty' });
  }

  if (moongose.connection.readyState === 0) {
    // Internal Server error if db connection is null
    return res
      .status(500)
      .json({ message: 'Server lost connection with database' });
  }
  // Request file validation
  let fileImages = {};
  const allowedFileExtensions = ['jpg', 'jpeg', 'png', 'webp'];
  if (requestFilesLength > 0) {
    for (const file in files) {
      const imageName = files[file].name;
      const splitName = imageName.split('.');
      const fileExtension = splitName[splitName.length - 1];
      const found = allowedFileExtensions.find(
        extension => extension === fileExtension
      );
      if (found) {
        const num = Math.floor(Math.random() * 100 * Date.now());
        const fileName = `IMG_${num}.${fileExtension}`;
        fileImages[file] = {
          save: files[file].mv,
          url: `images/${userName}/${fileName}`,
          path: `./images/${userName}/${fileName}`,
          name: files[file].name.split('.')[0],
        };
      } else {
        console.log(`${files[file].name} is not a valid file`);
        return res.status(400).json({ message: 'Invalid file' });
      }
    }
  }
  // Request body validation
  if (requestBodyLength > 0) {
    try {
      await validate.properties(body);
    } catch (err) {
      return res.status(400).json({ message: err.name });
    }
  }

  const imageUrls = Object.values(fileImages).map(({ url, name }) => ({
    url,
    name,
  }));

  const data = imageUrls.length ? { ...body, imageUrls } : { ...body };
  if (data.id) {
    try {
      const existingDocument = await Estate.findById(data.id);
      existingDocument.overwrite(data);
      const document = await existingDocument.save();
      if (Object.keys(fileImages).length > 0) {
        for (const img in fileImages) {
          fileImages[img].save(path.join(fileImages[img].path));
        }
      }
      return res.status(202).json({ message: 'upload successfull' });
    } catch (err) {
      console.log('error: ', err.name);
      return res.status(500).json({ message: 'Upload failed' });
    }
  } else {
    try {
      const estate = new Estate({
        _id: new moongose.Types.ObjectId(),
        ...data,
      });
      const document = await estate.save();
      if (Object.keys(fileImages).length > 0) {
        for (const img in fileImages) {
          fileImages[img].save(path.join(fileImages[img].path));
        }
      }
      return res.status(202).json({ message: 'upload successfull' });
    } catch (err) {
      console.log('error: ', err);
      return res.status(500).json({ message: 'Upload failed' });
    }
  }
});

module.exports = router;
