export function flattenBlogObject(nestedValues) {
  const {
    category: { name: categoryName = "", title: categoryTitle = "" } = {},
    author: {
      role: authorRole = "",
      name: authorName = "",
      imageUrl: authorImageUrl = "",
    } = {},
    ...rest
  } = nestedValues;

  return {
    ...rest,
    categoryName,
    categoryTitle,
    authorRole,
    authorName,
    authorImageUrl,
  };
}
