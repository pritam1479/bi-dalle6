import { FormValues } from 'interfaces/tool';

export const validateForm = (fromValues: FormValues) => {
    const errors: { message: string } = { message: '' };
    let hasError = false;

    Object.keys(fromValues).forEach((key) => {
        switch (key) {
            case 'title':
                if (!fromValues.title) {
                    errors.message = 'Title is required';
                    hasError = true;
                }
                break;

            case 'description':
                if (!fromValues.description) {
                    errors.message = 'Description is required';
                    hasError = true;
                }
                break;

            case 'propertyType':
                if (!fromValues.toolType) {
                    errors.message = 'Tool type is required';
                    hasError = true;
                }
                break;
            
            case 'price':
                if (!fromValues.price) {
                    errors.message = 'Price is required';
                    hasError = true;
                }
                break;

            default:
                hasError = false;
        }
    });

    return { hasError, errors }
};

export const hasChanged = (initialValues: FormValues, currentValues: FormValues) => {
    const initialValuesArray = Object.values(initialValues);
    const currentValuesArray = Object.values(currentValues);
    for (let i = 0; i< initialValuesArray.length; i++) {
        if (initialValuesArray[i] !== currentValuesArray[i]) {
            return true;
        }
    }
    return false;
}