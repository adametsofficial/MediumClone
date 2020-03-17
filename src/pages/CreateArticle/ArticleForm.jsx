import React, { useState, useEffect } from "react";
import { BackendErrorMessages } from "../../components/BackendErrorMessages/BackendErrorMessages";

// import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import styles
import "react-summernote/lang/summernote-ru-RU";

const ArticleForm = ({ onSubmit, errors, initialValues }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [description, setDescription] = useState("");
  const [tagList, setTagList] = useState("");

  const article = { title, body, description, tagList };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(article);
  };

  useEffect(() => {
    if (!initialValues) {
      return;
    }

    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setBody(initialValues.body);
    setTagList(initialValues.tagList.join(" "));
  }, [initialValues]);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errors && <BackendErrorMessages backendError={errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="What is this article about?"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <ReactSummernote
                    value="Default value"
                    options={{
                      lang: "ru-RU",
                      height: 350,
                      dialogsInBody: true,
                      toolbar: [
                        ["style", ["style"]],
                        ["font", ["bold", "underline", "clear"]],
                        ["fontname", ["fontname"]],
                        ["para", ["ul", "ol", "paragraph"]],
                        ["table", ["table"]],
                        ["insert", ["link", "picture", "video"]],
                        ["view", ["fullscreen", "codeview"]]
                      ]
                    }}
                    onChange={e => setBody(e)}
                    codeview={true}
                  />
                  {/* <textarea
                    rows="8"
                    className="form-control"
                    placeholder="Write your article (in markdown)"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                  ></textarea> */}
                  {/* <CKEditor
                    editor={ClassicEditor}
                    data={body}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log(data);
                      setBody(data && data)
                    }}
                  /> */}
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter tags"
                    value={tagList}
                    onChange={e => setTagList(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <button
                    type="submit"
                    className="btn btn-lg pull-xs-right btn-primary"
                  >
                    Publish Article
                  </button>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;
