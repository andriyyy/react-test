const validate = values => {
    const errors = {}
    const requiredFields = [
      'title',
      'description',
      'user',
    ];
    requiredFields.forEach(field => {
     if (!values[field] || !values[field].length) {
         errors[field] = 'Required'

     }
    });
    if (!values.image || !values.image.size ) {
        errors.image = 'Required'
    }
    return errors
  };
export { validate };