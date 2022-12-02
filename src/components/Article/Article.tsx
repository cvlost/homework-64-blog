import React, {ChangeEventHandler, MouseEventHandler} from 'react';
import Spinner from "../Spinner/Spinner";

interface Props {
  heroImg: string;
  imgLeft: boolean;
  title: string;
  content: string;
  turnEdit: MouseEventHandler;
  switchImgSide: ChangeEventHandler<HTMLInputElement>
  saveChanges: MouseEventHandler;
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  resetArticle: MouseEventHandler;
  isFetching: boolean;
  isEdit: boolean;
}

const Article: React.FC<Props> = (props) => {
  const inputStyles: React.CSSProperties = {
    backgroundColor: 'transparent',
    outline: 0,
    border: 0,
    flex: '1 1 100px',
    minWidth: '100px',
    width: '100%'
  }

  let text: React.ReactNode = <Spinner/>;

  if (!props.isFetching) text = (
    <>
      <div className={`col d-flex ${props.imgLeft ? 'order-1' : ''}`}>
        <div className="custom-mw d-flex">
          <div className={`custom-mw m-auto ${props.isEdit ? 'shadow p-3 bg-white bg-opacity-25 rounded-3' : ''}`}>
            <h3 className="border-bottom border-3 mb-3 pb-2 d-flex">
              <input
                type="text" name="title"
                value={props.title}
                onChange={props.handleChange}
                disabled={!props.isEdit}
                style={props.isEdit ? {} : inputStyles}
                className={`${props.heroImg === '' ? '' : props.imgLeft ? '' : 'text-end order-1'} ${props.isEdit ? 'form-control' : ''}`}
              />
              {!props.isEdit && (
                <button className="btn btn-sm btn-link" onClick={props.turnEdit}>
                  <small className="text-secondary fst-italic">Edit</small>
                </button>
              )}
            </h3>
            {props.isEdit && (
              <>
                <div>
                  <span>Image URL:</span>
                  <input
                    className={`${props.isEdit ? 'form-control mb-2' : ''}`}
                    type="text" name="heroImg"
                    value={props.heroImg}
                    onChange={props.handleChange}
                    disabled={!props.isEdit}
                    style={props.isEdit ? {} : inputStyles}
                  />
                </div>
                {props.heroImg !== '' && (
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="ifImgOnLeft"
                      checked={props.imgLeft}
                      onChange={props.switchImgSide}
                    />
                    <label className="form-check-label" htmlFor="ifImgOnLeft">
                      Image on the left side?
                    </label>
                  </div>
                )}
              </>
            )}
            {props.isEdit ? (
              <>
                  <textarea
                    className={`${props.isEdit ? 'form-control mb-3' : ''}`}
                    name="content"
                    value={props.content}
                    onChange={props.handleChange}
                    disabled={!props.isEdit}
                    style={props.isEdit ? {} : inputStyles}
                    rows={6}
                  />
                <div className="d-flex gap-2 justify-content-center">
                  <button className="btn btn-sm btn-primary" onClick={props.saveChanges}>Save</button>
                  <button className="btn btn-sm btn-secondary" onClick={props.resetArticle}>Use defaults</button>
                </div>
              </>
            ) : (
              <p style={{whiteSpace: 'pre-wrap'}}>{props.content}</p>
            )}
          </div>
        </div>
      </div>
      {props.heroImg !== '' && (
        <div className="col d-flex">
          <img
            className="m-auto img-fluid"
            style={{maxHeight: '70vh'}}
            src={props.heroImg} alt="avatar"
          />
        </div>
      )}
    </>
  );

  return (
    <div className="row h-100 mb-5">
      {text}
    </div>
  );
};

export default Article;