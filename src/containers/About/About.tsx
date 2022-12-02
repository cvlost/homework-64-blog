import React, {useCallback, useEffect, useRef, useState} from 'react';
import Article from "../../components/Article/Article";
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";

interface ArticleData {
  heroImg: string;
  title: string;
  content: string;
  imgLeft: boolean;
}

interface Response {
  default: ArticleData[],
  custom?: ArticleData[],
}

const About = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [editedArticleIndex, setEditedArticleIndex] = useState<null | number>(null);
  const [editMode, setEditMode] = useState<boolean[] | null>(null);
  const [fetchMode, setFetchMode] = useState<boolean[] | null>(null);

  const [articles, setArticles] = useState<ArticleData[] | null>(null);
  const defaultSettings = useRef<ArticleData[] | null>(null);

  const sendData = useCallback(async (index: number) => {
    turnFetchFor(index, true);
    await axiosApi.put('/about/custom.json', articles);
    turnEditModeFor(index, false);
    turnFetchFor(index, false);
  }, [articles]);

  useEffect(() => {
    if (editedArticleIndex !== null) {
      sendData(editedArticleIndex).catch();
      setEditedArticleIndex(null);
    }
  }, [editedArticleIndex, sendData]);

  const saveChanges = (index: number) => {
    setEditedArticleIndex(index)
  };

  const turnFetchFor = (index: number, on: boolean) => {
    setFetchMode(prev => {
      const copy = [...prev!];
      copy[index] = on;
      return copy;
    });
  };

  const switchImgPosFor = (index: number) => {
    setArticles(prev => {
      const articlesCopy = [...prev!];
      articlesCopy[index] = {...articlesCopy[index], imgLeft: !articlesCopy[index].imgLeft};
      return articlesCopy;
    })
  };

  const turnEditModeFor = (index: number, on: boolean) => {
    setEditMode(prev => {
      const copy = [...prev!];
      copy[index] = on;
      return copy;
    });
  };

  const checkEditModeFor = (index: number) => {
    return editMode![index];
  };

  const checkFetchModeFor = (index: number) => {
    return fetchMode![index];
  };

  const handleChangeFor = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    const articlesCopy = [...articles!];
    articlesCopy[index] = {...articlesCopy[index], [name]: value};
    setArticles(articlesCopy);
  };

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    const response = await axiosApi<Response>('/about.json');
    if (response.data !== null) {
      if (response.data.custom) {
        defaultSettings.current = response.data.default;
        setArticles(response.data.custom);
      } else {
        setArticles(response.data.default);
      }
      setEditMode(new Array(response.data.default.length).fill(false));
      setFetchMode(new Array(response.data.default.length).fill(false));
    }
    setIsFetching(false)
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  let output: React.ReactNode = <Spinner/>

  if (articles !== null && !isFetching) {
    output = articles.map((article, i) => (
      <Article
        key={i}
        {...article}
        turnEdit={() => turnEditModeFor(i, true)}
        switchImgSide={() => switchImgPosFor(i)}
        saveChanges={() => saveChanges(i)}

        handleChange={(e) => handleChangeFor(i, e)}
        isFetching={checkFetchModeFor(i)}
        isEdit={checkEditModeFor(i)}
      />
    ))
  }

  return (
    <div className="container">
      {output}
    </div>
  );
};

export default About;