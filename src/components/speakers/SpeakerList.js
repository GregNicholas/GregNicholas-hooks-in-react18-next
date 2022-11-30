import SpeakerLine from "./SpeakerLine";
import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';

function List({ state, dispatch }) {
  const [updatingId, setUpdatingId] = useState(0);
  const isPending = false;

  function toggleFavoriteSpeaker(speakerRec) {
    const updatedSpeakerRec = {...speakerRec, favorite: !speakerRec.favorite}
s    dispatch({type: "updateSpeaker", speaker: updatedSpeakerRec})
    const updateAsync = async (rec) => {
      setUpdatingId(rec.id);
      await axios.put(`/api/speakers/${rec.id}`, updatedSpeakerRec);
      setUpdatingId(0);
    } 
    updateAsync(updatedSpeakerRec);
  }

  return (
    <div className="container">
      <div className="border-0">
        <div
          className="btn-toolbar"
          role="toolbar"
          aria-label="Speaker toolbar filter"
        >
          <div className="toolbar-trigger mb-3 flex-grow-04">
            <div className="toolbar-search w-100">
              <input
                value=""
                onChange={(event) => {}}
                type="text"
                className="form-control"
                placeholder="Highlight Names"
              />
            </div>
            <div className="spinner-height">
              {isPending && (
                <i className="spinner-border text-dark" role="status" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {state.speakers.map(function (speakerRec) {
          const highlight = false;
          return (
            <SpeakerLine
              key={speakerRec.id}
              speakerRec={speakerRec}
              updating={updatingId === speakerRec.id ? updatingId : 0}
              toggleFavoriteSpeaker={() => toggleFavoriteSpeaker(speakerRec)}
              highlight={highlight}
            />
          );
        })}
      </div>
    </div>
  );
}

const SpeakerList = () => {
  const darkTheme = false;
  const initialState = {speakers: [], loading: true}

  const reducer = (state, action) => {
    switch (action.type) {
      case 'speakersLoaded': 
        return {...state, loading: false, speakers: action.speakers}
      case 'setLoadingStatus':
        return {...state, loading: true}
      case 'updateSpeaker':
        const updatedSpeakers = state.speakers.map(speaker => {
          return speaker.id === action.speaker.id ? action.speaker : speaker;
        });
        return {...state, speakers: updatedSpeakers}
      default:
        throw new Error(`case failure. type: ${action.type}`)
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const getDataAsync = async () => {
      dispatch({type: "setLoadingStatus"});
      const results = await axios.get("api/speakers");
      dispatch({type: "speakersLoaded", speakers: results.data});
    }

    getDataAsync();
  }, []);

  const updateSpeaker = (speakerRec) => {
    dispatch({ type: "updateSpeaker", updatedSpeaker: speakerRec });
  }

  if(state.loading){
    return (
      <div> Loading speakers...</div>
    )
  }

  return (
    <div className={darkTheme ? "theme-dark" : "theme-light"}>
      <List state={state} dispatch={dispatch}/>
    </div>
  );
};

export default SpeakerList;
