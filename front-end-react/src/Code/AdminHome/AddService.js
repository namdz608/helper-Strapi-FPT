import React, { Component } from "react";
import SideNav from "../Layout/Sidenav";
import axios from "axios";
import { toast } from "react-toastify";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class AddService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      contentMarkdown: "",
      contentHtml: "",
      description: null,
      name: null,
      user: this.props.location.state.state,
    };
  }

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  handleImg1 = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await this.getBase64(file);
      let obj = URL.createObjectURL(file);
      this.setState({
        previewURLImg: obj,
        image1: base64,
      });
    }
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHtml: html,
    });
  };

  AddUserChange = (event, id) => {
    let copy = { ...this.state };
    copy[id] = event.target.value;
    this.setState({
      ...copy,
    });
  };

  AddService = async () => {
    let a = await axios.post(`http://localhost:1337/api/services`, {
      data: {
        name: this.state.name,
        image: this.state.image1,
        contentHtml: this.state.contentHtml,
        description: this.state.description,
        contentMarkdown: this.state.contentMarkdown,
      },
    });
    if (a.status === 201) {
      toast.success("Created successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      await this.componentDidMount();
    } else {
      toast.error('Failed');
    }
  };

  render() {
    let { feature, image1, description, name, user } = this.state;
    return (
      <>
        <div>
          <SideNav user={user} />
        </div>
        <section className="twitter">
          <div className=" text-center mt-5 ">
            <h1>Add New Service</h1>
          </div>
          <div className="row ">
            <div className="col-lg-7 mx-auto">
              <div className="card mt-2 mx-auto p-4 bg-light">
                <div className="card-body bg-light">
                  <div className="container">
                    <div className="controls">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label for="form_name">Name *</label>
                            <input
                              id="form_name"
                              type="text"
                              value={name}
                              className="form-control"
                              onChange={(event) =>
                                this.AddUserChange(event, "name")
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label for="form_email">Image 1</label>
                            <input
                              id="form_email"
                              type="file"
                              onChange={(event) => this.handleImg1(event)}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label for="form_need">Preview Image 1</label>
                            <img src={image1} />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label for="form_message">Feature</label>
                            <MdEditor
                              style={{ height: "250px" }}
                              renderHTML={(text) => mdParser.render(text)}
                              onChange={this.handleEditorChange}
                              value={this.state.contentMarkdown}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label for="form_message">Description</label>
                            <textarea
                              id="form_message"
                              name="message"
                              className="form-control"
                              rows="4"
                              onChange={(event) =>
                                this.AddUserChange(event, "description")
                              }
                              value={description}
                            ></textarea>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <button
                            className="btn btn-success btn-send  pt-2 btn-block"
                            onClick={() => this.AddService()}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default AddService;
