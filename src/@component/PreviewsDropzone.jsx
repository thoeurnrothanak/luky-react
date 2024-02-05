import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, LinearProgress, Typography } from '@material-ui/core';
import axios from 'axios';
import { fileUpload } from 'services/api';

const PreviewsDropzone = ({ onChange, value, disabled = false, imgmaxheight, ...props }) => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    disabled: disabled,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });
  const upload = async (file) => {
    const data = await fileUpload(file, (event) => {
      setProgress((100 * event.loaded) / event.total);
    });
    if (onChange && data[0]) {
      onChange(data[0]);
    }
  };

  useEffect(() => {
    if (files[0]) {
      let file = files[0];
      // upload(file, event => {
      //   console.log(event);
      //   setProgress((100 * event.loaded) / event.total);
      // });
      upload(file);
    }

    return () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Box {...props}>
      <Box
        {...getRootProps({
          className: 'dropzone',
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        })}>
        <input {...getInputProps()} />
        {files[0] | !!value ? (
          <Box style={{ height: imgmaxheight ?? '120px' }}>
            <img
              src={files[0]?.preview ?? `${process.env.REACT_APP_PFI_SERVICE}/file/${value.id}`}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                margin: 'auto',
                display: 'block',
                maxHeight: imgmaxheight ?? '120px',
              }}
            />
            {progress && <LinearProgress variant="determinate" value={progress} />}
          </Box>
        ) : (
          <Typography style={{ textAlign: 'center' }}>{props.placeholder}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default PreviewsDropzone;
