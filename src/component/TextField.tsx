import { TextField as TextFieldBase, TextFieldProps as TextFieldPropsBase } from "@mui/material";
import { Controller, useFormContext, } from "react-hook-form";

/**
 * テキストフィールドを拡張
 * name属性とlabel属性を強制化
 */
type TextFieldProps = Omit<TextFieldPropsBase, 'name' | 'label'> &
{
  name: string
  label: string
};

export const TextField = (props: TextFieldProps) => {
  const { name, type, label, ...other } = props;
  const {
    register,
    control
  } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ fieldState: { error } }) => (
          <TextFieldBase
            {...other}
            {...register(name)}
            label={label}
            variant="outlined"
            error={error ? true : false}
            helperText={error?.message as string}
          />
        )}
      />
    </>
  );
};