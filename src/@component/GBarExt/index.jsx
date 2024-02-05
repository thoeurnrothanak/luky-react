import React from 'react';
import { Box, Divider, Typography } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";
import {ThemeProvider} from "@mui/material";
import {createTheme} from "@material-ui/core/styles";
import {createStyles} from "@material-ui/styles";

const THEME = createTheme({
    overrides:{
        MuiInputBase: createStyles({
            input:{
                "&&" :{
                    color:'red'
                }
            }
        })
    }
})

const GBarExt = ({ title = '', contentType='text',
                        prefix='',

                     decimalScale=2,
                     titleColor = '#DA0063', content = '' }) => {
    let contentUI= <Box fontSize={18}>{content}</Box>;
    if(contentType=='amount') {
        contentUI = <NumberFormat
            value={+content}
            customInput={TextField}
            decimalScale={decimalScale}
            fullWidth={true}
            InputProps={{ disableUnderline: true, color:'red',fontWeight: 'bold' }}
            disabled={true}
            allowEmptyFormatting={false}
            type="text"
            size={'small'}
            thousandSeparator={true}
            prefix={prefix}
        />
    }
  return (
      <ThemeProvider  theme={THEME}>
    <Box display="flex" style={{ height: 60 }}>
      <Divider orientation="vertical" style={{ width: 14, background: titleColor }} />
      <Box display="flex" flexDirection="column"
           justifyContent="space-between" style={{ color: titleColor, padding: 4 }}>
        <Typography variant="h4" style={{color:'black'}}>
          {title}
        </Typography>
        <Typography variant="h3">
            {contentUI}
        </Typography>
      </Box>
    </Box>
      </ThemeProvider>
  );
};

export default GBarExt;
