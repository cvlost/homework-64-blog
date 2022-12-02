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
          <div className="custom-mw m-auto">
            <h3 className="border-bottom border-3 mb-3 pb-2 d-flex">
              <input
                type="text" name="title"
                value={fields.title}
                onChange={handleChange}
                disabled={!isEdit}
                style={isEdit ? editInputStyles : inputStyles}
              />
              {!isEdit && (
                <button className="btn btn-link btn-sm" onClick={() => setIsEdit(true)}>
                  <small className="text-secondary fst-italic">Edit</small>
                </button>
              )}
            </h3>
            <ul>
              {isEdit && (
                <li className="d-flex flex-wrap flex-lg-nowrap mb-2">Hero Image:
                  <input
                    type="text" name="heroImg"
                    value={fields.heroImg}
                    onChange={handleChange}
                    disabled={!isEdit}
                    style={isEdit ? editInputStyles : inputStyles}
                  />
                </li>
              )}
              <li className="d-flex flex-wrap flex-lg-nowrap mb-2">E-Mail:
                <input
                  type="text" name="email"
                  value={fields.email}
                  onChange={handleChange}
                  disabled={!isEdit}
                  style={isEdit ? editInputStyles : inputStyles}
                />
              </li>
              <li className="d-flex flex-wrap flex-lg-nowrap mb-2">Phone:
                <input
                  type="text" name="phone"
                  value={fields.phone}
                  onChange={handleChange}
                  disabled={!isEdit}
                  style={isEdit ? editInputStyles : inputStyles}
                />
              </li>
              <li className="d-flex flex-wrap flex-lg-nowrap mb-2">Telegram:
                <input
                  type="text" name="telegram"
                  value={fields.telegram}
                  onChange={handleChange}
                  disabled={!isEdit}
                  style={isEdit ? editInputStyles : inputStyles}
                />
              </li>
            </ul>
            {isEdit && (<div className="d-flex gap-2 justify-content-center">
              <button className="btn btn-primary" onClick={saveChanges}>Save</button>
              <button className="btn btn-secondary" onClick={resetSettings}>Use defaults</button>
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