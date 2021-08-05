/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
 * Licensed Under MIT (http://opensource.org/licenses/MIT)
 *
 * React File Base64 - Version@1.0.0
 *
 */

import { ButtonGroup, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
let fileName = "";
export default class FileBase64 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  handleChange(e) {
    // get the files
    let files = e.target.files;

    // Process each file
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {
      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + " kB",
          base64: reader.result,
          file: file,
        };
        if (files.length === 1) {
          fileName = file.name;
        } else {
          fileName = files.length + " Images";
        }

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if (allFiles.length === files.length) {
          // Apply Callback function
          if (this.props.multiple) this.props.onDone(allFiles);
          else this.props.onDone(allFiles[0]);
        }
      }; // reader.onload
    } // for
  }

  render() {
    return (
      <Grid>
        <ButtonGroup
          color="primary"
          aria-label="outlined secondary button group"
        >
          <Button
            color="primary"
            variant="contained"
            disableElevation
            style={{ textTransform: "none" }}
          >
            <label
              for="file-upload"
              class="custom-file-upload"
              style={{ cursor: "pointer" }}
            >
              <Typography variant="body1">Unggah Foto</Typography>
            </label>
          </Button>
          <Button disabled style={{ textTransform: "none" }}>
            <span>{fileName}</span>
          </Button>
        </ButtonGroup>

        <input
          style={{ position: "fixed", right: "100%", bottom: "100%" }}
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={this.handleChange.bind(this)}
          multiple={this.props.multiple}
        />
      </Grid>
    );
  }
}

FileBase64.defaultProps = {
  multiple: false,
};
