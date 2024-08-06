export const validateBlog = (values) => {
  const errors = {};
  const smallInputMinLength = 3;
  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.date) {
    errors.date = "Date is required";
  }
  if (values.description.length <= 30) {
    errors.description = "Description must be no more than 35 characters long";
  }
  if (!values.description) {
    errors.description = "Description is required";
  }
  if (
    !values.categoryName ||
    values.categoryName.length < smallInputMinLength
  ) {
    errors.categoryName = `Category must be at least ${smallInputMinLength} characters long`;
  }
  if (
    !values.categoryTitle ||
    values.categoryTitle.length < smallInputMinLength
  ) {
    errors.categoryTitle = `Category Title must be at least ${smallInputMinLength} characters long`;
  }
  if (!values.imageUrl) {
    errors.imageUrl = "Image URL is required";
  }
  if (!values.authorRole || values.authorRole.length < 4) {
    errors.authorRole = "Author Role must be at least 4 characters long";
  }
  if (!values.authorName || values.authorName.length < 2) {
    errors.authorName = "Author Name must be at least 2 characters long";
  }
  if (!values.authorImageUrl) {
    errors.authorImageUrl = "Author Image URL is required";
  }

  return errors;
};