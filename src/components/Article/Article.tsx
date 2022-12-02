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
    marginLeft: '.3em',
    width: '100%'
  }

  const editInputStyles: React.CSSProperties = {
    backgroundColor: 'white',
    border: '1px solid gray',
    flex: '1 1 100px',
    minWidth: '100px',
    marginLeft: '.3em',
    width: '100%'
  }

  let text: React.ReactNode = <Spinner/>;

  if (!props.isFetching) text = (
    <>
      <div className={`col d-flex ${props.imgLeft ? 'order-1' : ''}`}>
        <div className="custom-mw d-flex">
          <div className="custom-mw m-auto">
            <h3 className="border-bottom border-3 mb-3 pb-2 d-flex">
              <input
                type="text" name="title"
                value={props.title}
                onChange={props.handleChange}
                disabled={!props.isEdit}
                style={props.isEdit ? editInputStyles : inputStyles}
                className={`${props.heroImg === '' ? '' : props.imgLeft ? '' : 'text-end order-1'}`}
              />
              {!props.isEdit && (
                <button className="btn btn-sm btn-link" onClick={props.turnEdit}>
                  <small className="text-secondary fst-italic">Edit</small>
                </button>
              )}
            </h3>
            {props.isEdit && (
              <>
                <div>Hero image:
                  <input
                    type="text" name="heroImg"
                    value={props.heroImg}
                    onChange={props.handleChange}
                    disabled={!props.isEdit}
                    style={props.isEdit ? editInputStyles : inputStyles}
                  />
                </div>
                {props.heroImg !== '' && (
                  <label htmlFor="">
                    Image on the left
                    <input
                      type="checkbox"
                      name="imgLeft"
                      checked={props.imgLeft}
                      onChange={props.switchImgSide}
                    />
                  </label>
                )}
              </>
            )}
            {props.isEdit ? (
              <>
                  <textarea
                    name="content"
                    value={props.content}
                    onChange={props.handleChange}
                    disabled={!props.isEdit}
                    style={props.isEdit ? editInputStyles : inputStyles}
                    rows={6}
                  />
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-primary" onClick={props.saveChanges}>Save</button>
                  <button className="btn btn-sm btn-secondary">Use defaults</button>
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