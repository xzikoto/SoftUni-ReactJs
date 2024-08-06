export default function transformBlogObject(initialValues) {
  const {
    categoryName = "",
    categoryTitle = "",
    authorRole = "",
    authorName = "",
    authorImageUrl = "",
    ...rest
  } = initialValues;

  return {
    ...rest,
    category: {
      name: categoryName,
      title: categoryTitle,
    },
    author: {
      role: authorRole,
      name: authorName,
      imageUrl: authorImageUrl,
    },
  };
}
