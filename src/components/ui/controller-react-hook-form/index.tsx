import React, { ReactElement } from "react";
import {
  Controller,
  ControllerProps,
  ControllerRenderProps,
  FieldValues,
  Path,
  RefCallBack,
  UseControllerReturn,
} from "react-hook-form";

// Props needed for @mui fields
interface ControllerReactHookFormFieldProps<TRegister extends FieldValues>
  extends Omit<ControllerRenderProps<TRegister>, "ref"> {
  inputRef: RefCallBack;
}

interface ControllerReactHookFormProps<TRegister extends FieldValues> {
  name: Path<TRegister>;
  control: ControllerProps<TRegister>["control"];
  render: (
    controlProps:
      | ControllerReactHookFormFieldProps<TRegister>
      | Record<string, never>,
    data: UseControllerReturn<TRegister> | Record<string, never>
  ) => ReactElement;
  ControlProps?: Omit<
    ControllerProps<TRegister>,
    "render" | "name" | "control"
  >;
}

export const ControllerReactHookForm = <TRegister extends FieldValues>({
  name,
  control,
  render,
  ControlProps,
}: ControllerReactHookFormProps<TRegister>): ReactElement => {
  const isController = control && name;

  if (isController) {
    return (
      <Controller
        name={name}
        control={control}
        render={(data) =>
          render({ ...data.field, inputRef: data.field.ref }, data)
        }
        {...ControlProps}
      />
    );
  }

  // If no react-hook-form props, call the render function directly
  return render({}, {});
};
