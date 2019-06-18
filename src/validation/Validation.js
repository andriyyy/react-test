const validate = values => {
    const errors = {}
    const requiredFields = [
      'title',
      'description',
      'image',
      'user',
      'favoriteColor'
    ]
    requiredFields.forEach(field => {
      console.log("field", field)
        console.log("values",values);

     if (!values[field]) {

        errors[field] = 'Required'

     }
     if (values.image && !values.image.size ) {
       console.log(values.image.size);
        errors[field] = 'Required'
      }


    })
console.log("errors", errors);
    return errors
  }
export { validate };