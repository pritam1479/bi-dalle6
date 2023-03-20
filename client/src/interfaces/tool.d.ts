import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    toolType: string,
    location: string,
    price: number | undefined,
}

export interface ToolCardProps {
  id?: BaseKey | undefined,
  title: string,
  description: string,
  offers: string,
  trending: string,
  price: string,
  photo: string,
}
