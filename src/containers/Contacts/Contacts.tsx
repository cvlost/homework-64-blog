import React, {useCallback, useEffect, useRef, useState} from 'react';
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";

interface ContactData {
  [key: string]: string;
}

interface Response {
  default: ContactData,
  custom?: ContactData,
}

const Contacts = () => {
  const [fields, setFields] = useState<ContactData | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const defaultSettings = useRef<ContactData | null>(null);
  const initialRender = useRef(true);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    const response = await axiosApi<Response>('/contacts.json');
    if (response.data !== null) {
      if (response.data.custom) {
        defaultSettings.current = response.data.default;
        setFields(response.data.custom);
      } else {
        setFields(response.data.default);
      }
    }
    setIsFetching(false)
  }, []);

  const resetSettings = () => {
    setFields(defaultSettings.current);
    setIsEdit(false);
  };

  const sendData = useCallback(async () => {
    setIsFetching(true);
    await axiosApi.put('/contacts/custom.json', fields);
    setIsFetching(false);
  }, [fields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFields((prev) => ({...prev, [name]: value}));
  };

  const saveChanges = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  useEffect(() => {
    if (!isEdit && !initialRender.current) sendData().catch(console.error);
    if (initialRender.current) initialRender.current = false;
  }, [isEdit, fields, sendData]);

  let output: React.ReactNode | null;

  const inputStyles: React.CSSProperties = {
    backgroundColor: 'transparent',
    outline: 0,
    border: 0,
    flex: '1 1 100px',
    minWidth: '100px',
    marginLeft: '.3em',
  }

  if (fields !== null && !isFetching) {
    output = (
      <div className="row h-100 mb-5">
        <div className="col col-12 col-md-6 d-flex">
          <img
            className="m-auto img-fluid"
            style={{maxHeight: '70vh'}}
            src={fields.heroImg} alt="avatar"/>
        </div>
        <div className="col col-12 col-md-6 d-flex">
          <div className={`custom-mw m-auto ${isEdit ? 'shadow p-3 bg-white bg-opacity-25 rounded-3' : ''}`}>
            <h3 className="border-bottom border-3 mb-3 pb-2 d-flex">
              <input
                className={`${isEdit ? 'form-control' : 'w-100'}`}
                type="text" name="title"
                value={fields.title}
                onChange={handleChange}
                disabled={!isEdit}
                style={isEdit ? {} : inputStyles}
              />
              {!isEdit && (
                <button className="btn btn-link btn-sm" onClick={() => setIsEdit(true)}>
                  <small className="text-secondary fst-italic">Edit</small>
                </button>
              )}
            </h3>
            <ul className="p-0 list-unstyled">
              {isEdit && (
                <li>Image URL:
                  <input
                    className={`${isEdit ? 'form-control mb-2' : ''}`}
                    type="text" name="heroImg"
                    value={fields.heroImg}
                    onChange={handleChange}
                    disabled={!isEdit}
                    style={isEdit ? {} : inputStyles}
                  />
                </li>
              )}
              <li>E-Mail:
                <input
                  className={`${isEdit ? 'form-control mb-2' : ''}`}
                  type="text" name="email"
                  value={fields.email}
                  onChange={handleChange}
                  disabled={!isEdit}
                  style={isEdit ? {} : inputStyles}
                />
              </li>
              <li>Phone:
                <input
                  className={`${isEdit ? 'form-control mb-2' : ''}`}
                  type="text" name="phone"
                  value={fields.phone}
                  onChange={handleChange}
                  disabled={!isEdit}
                  style={isEdit ? {} : inputStyles}
                />
              </li>
              <li>Telegram:
                <input
                  className={`${isEdit ? 'form-control mb-2' : ''}`}
                  type="text" name="telegram"
                  value={fields.telegram}
                  onChange={handleChange}
                  disabled={!isEdit}
                  style={isEdit ? {} : inputStyles}
                />
              </li>
            </ul>
            {isEdit && (<div className="d-flex gap-2 justify-content-center">
              <button className="btn btn-primary btn-sm" onClick={saveChanges}>Save</button>
              <button className="btn btn-secondary btn-sm" onClick={resetSettings}>Use defaults</button>
            </div>)}
          </div>
        </div>
      </div>
    );
  } else {
    output = <Spinner/>
  }

  return (
    <div className="container h-100">
      {output}
    </div>
  );
};

export default Contacts;