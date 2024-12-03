"use client";

import { InputAdornment, styled, TextField } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";

import { mappingEmoji } from "@/lib/utils";

interface IProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  name: string;
}

export default function ChatInput(props: IProps) {
  const {
    label,
    placeholder,
    onChange,
    value,
    className,
    children,
    disabled = false,
    name,
  } = props;

  return (
    <ExtendTextField
      autoComplete="off"
      disabled={disabled}
      className={className}
      type="text"
      label={label}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      // dangerouslySetInnerHTML={{__html:getSafeHtml(valu)}}
      slotProps={{
        input: {
          endAdornment: <>{children}</>,
        },
      }}
    />
  );
}

const ExtendTextField = styled(TextField)(() => {
  return {
    zIndex: 3,
    "&.MuiTextField-root": {
      zIndex: 3,
      minHeight: "unset",
    },
    "& .MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
      zIndex: 3,
      border: "1px solid #eee",
      borderRadius: "32px",

      "& :hover": {
        border: "1px solid #eee !important",
      },
      "&:hover": {
        border: "1px solid #eee !important",
      },
    },
    "& .MuiInputLabel-root": {
      zIndex: 3,
      fontSize: "13px",
      color: "#bcbcbc",
      paddingLeft: "8px",
    },
    "& .MuiOutlinedInput-root": {
      zIndex: 3,
      input: {
        zIndex: 3,
        fontSize: "14px",
        padding: "16.5px 0px 16.5px 24px",
      },
      hover: {
        border: "1px solid #eee !important",
      },
    },
  };
});
