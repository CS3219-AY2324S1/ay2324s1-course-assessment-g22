import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from "@mui/material/TextField";

export default function CommonMultiSelectComponent(props) {
  const {
    options,
    noOptionsText,
    onInputChange,
    errorText,
    disabled,
    InputProps,
    ...restProps
  } = props;

  return (
    <Autocomplete
      options={options}
      multiple={true}
      noOptionsText={noOptionsText}
      ChipProps={{ color: 'primary' }}
      renderInput={params => {
        return (
          <TextField
            {...params}
            variant="outlined"
            label={props.label}
            disabled={disabled}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {props.loading ? (
                    <CircularProgress color="primary" size={20} />
                  ) : null}
                  {disabled ? '' : params.InputProps.endAdornment}
                </React.Fragment>
              ),
              ...InputProps
            }}
          />
        );
      }}
      disableCloseOnSelect
      onInputChange={onInputChange}
      filterOptions={options => options}
      {...restProps}
    />
  );
}