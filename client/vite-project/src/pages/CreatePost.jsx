import { useState } from "react";
import { FormField, Loader } from "../Components";
import { preview } from "../assets";
import { getRandomPrompts } from "../utils";

const CreatePost = () => {
  const generateImg = async () => {
    if (form.prompts) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompts: form.prompts }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        console.log("This is error msg", error);
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      // alert("Please enter a prompts");
      console.log("Please enter a prompts");
    }
  };
  const handleSubmit = () => {};
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompts(form.prompts);
    setForm({ ...form, prompts: randomPrompt });
  };
  // const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompts: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);

  const [loading, setLoading] = useState(false);
  setLoading(loading); // Invoking setLoading to satisfy ESLint
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px] ">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Create imaginative & visually stunning images generated by DALL-E AI
          and share them with community.
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            LabelName="Your Name"
            type="text"
            name="name"
            placeholder="john doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            LabelName="prompts"
            type="text"
            name="prompts"
            placeholder="an oil painting by Matisse of a humanoid robot playing chess"
            value={form.prompts}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg  focus: ring-blue-500  focus:border-blue-500  w-64 p-3 h-64 flex justify-center  items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompts}
                className="w-full  h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgb(0.0.0.0.5)]  rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button "
            onClick={generateImg}
            className="text-white bg-green-700  font-medium rounded-md text-sm w-full  sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "generating..." : "generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className=" mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want, you can share it with
            other in the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full  sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "sharing..." : "Share with community"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default CreatePost;
