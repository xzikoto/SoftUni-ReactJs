import { Modal, Button, TextInput, Textarea, Label } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useCreateBlog } from "../../../hooks/useBlogs";
import { useForm } from "../../../hooks/useForm";
import transformBlogObject from "./transformBlogObject";
import { validateBlog } from "../../../utils/validationFormUtils";

const initialValues = {
  title: "",
  datetime: "",
  date: "",
  categoryName: "",
  categoryTitle: "",
  description: "",
  imageUrl: "",
  authorRole: "",
  authorName: "",
  authorImageUrl: "",
};

export default function CreateBlog({ show, onClose }) {
  const navigate = useNavigate();
  const createBlog = useCreateBlog();

  const createHandler = async (values) => {
    try {
      const blogObjectEntity = transformBlogObject(values);
      const { _id: blogId } = await createBlog(blogObjectEntity);

      navigate(`/blogs/${blogId}/details`);
    } catch (err) {
      // TODO: Handle the error appropriately
      console.log(err.message);
    }
  };

  const { values, changeHandler, submitHandler, errors } = useForm(
    initialValues,
    createHandler,
    validateBlog
  );

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Create a new Blog</Modal.Header>
      <Modal.Body>
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </Label>
                <TextInput
                  id="title"
                  name="title"
                  value={values.title}
                  onChange={changeHandler}
                  className="w-full"
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">{errors.title}</span>
                )}
              </div>
              <div>
                <Label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </Label>
                <TextInput
                  id="date"
                  name="date"
                  type="date"
                  value={values.date}
                  onChange={changeHandler}
                  className="w-full"
                />
                {errors.date && (
                  <span className="text-red-500 text-sm">{errors.date}</span>
                )}
              </div>
              <div>
                <Label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={changeHandler}
                  placeholder="Enter a brief description"
                  rows={4}
                  className="w-full"
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="categoryName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </Label>
                <TextInput
                  id="categoryName"
                  name="categoryName"
                  value={values.categoryName}
                  onChange={changeHandler}
                  placeholder="Enter the category"
                  required
                  className="w-full"
                />
                {errors.categoryName && (
                  <span className="text-red-500 text-sm">
                    {errors.categoryName}
                  </span>
                )}
              </div>
              <div>
                <Label
                  htmlFor="categoryTitle"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category Title
                </Label>
                <TextInput
                  id="categoryTitle"
                  name="categoryTitle"
                  value={values.categoryTitle}
                  onChange={changeHandler}
                  placeholder="Enter the title of the category"
                  className="w-full"
                />
                {errors.categoryTitle && (
                  <span className="text-red-500 text-sm">
                    {errors.categoryTitle}
                  </span>
                )}
              </div>
              <div>
                <Label
                  htmlFor="imageUrl"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image URL
                </Label>
                <TextInput
                  id="imageUrl"
                  name="imageUrl"
                  value={values.imageUrl}
                  onChange={changeHandler}
                  placeholder="Enter the image URL"
                  type="url"
                  className="w-full"
                />
                {errors.imageUrl && (
                  <span className="text-red-500 text-sm">
                    {errors.imageUrl}
                  </span>
                )}
              </div>
              <div>
                <Label
                  htmlFor="authorRole"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author Role
                </Label>
                <TextInput
                  id="authorRole"
                  name="authorRole"
                  value={values.authorRole}
                  onChange={changeHandler}
                  placeholder="Enter the author's role"
                  className="w-full"
                />
                {errors.authorRole && (
                  <span className="text-red-500 text-sm">
                    {errors.authorRole}
                  </span>
                )}
              </div>
              <div>
                <Label
                  htmlFor="authorName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author Name
                </Label>
                <TextInput
                  id="authorName"
                  name="authorName"
                  value={values.authorName}
                  onChange={changeHandler}
                  placeholder="Enter the author's name"
                  className="w-full"
                />
                {errors.authorName && (
                  <span className="text-red-500 text-sm">
                    {errors.authorName}
                  </span>
                )}
              </div>
              <div>
                <Label
                  htmlFor="authorImageUrl"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author Image URL
                </Label>
                <TextInput
                  id="authorImageUrl"
                  name="authorImageUrl"
                  value={values.authorImageUrl}
                  onChange={changeHandler}
                  placeholder="Enter the author's image URL"
                  type="url"
                  className="w-full"
                />
                {errors.authorImageUrl && (
                  <span className="text-red-500 text-sm">
                    {errors.authorImageUrl}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4 gap-2">
            <Button
              type="submit"
              className="bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:focus:ring-blue-400 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300"
            >
              Create
            </Button>
            <Button
              onClick={onClose}
              className="bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:focus:ring-gray-400 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
