import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const INITIAL_ADD_FORM = {
  moviename: "",
  directorname: "",
  movieyear: "",
  genrename: "",
  isfav: false,
};

const INITIAL_EDIT_FORM = {
  _id: null,
  moviename: "",
  directorname: "",
  movieyear: "",
  genrename: "",
  isfav: false,
};

function App() {
  const API = "http://localhost:5000/movie";

  const [addForm, setAddForm] = useState(INITIAL_ADD_FORM);
  const [editForm, setEditForm] = useState(INITIAL_EDIT_FORM);
  const [moviedetails, setMovieDetails] = useState([]);

  const fetchmovie = async () => {
    const res = await axios.get(`${API}/fetch`);
    setMovieDetails(res.data);
  };

  useEffect(() => {
    fetchmovie();
  }, []);

  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const addmovie = async (e) => {
    e.preventDefault();
    await axios.post(API, addForm);
    setAddForm(INITIAL_ADD_FORM);
    fetchmovie();
  };

  const handleEdit = (movie) => {
    setEditForm(movie);
  };

  const updatemovie = async (e) => {
    e.preventDefault();
    const { _id, ...updatedData } = editForm;
    await axios.put(`${API}/${_id}`, updatedData);
    setEditForm(INITIAL_EDIT_FORM);
    fetchmovie();
  };

  const handleDelete = async (_id) => {
    await axios.delete(`${API}/${_id}`);
    fetchmovie();
  };

  const handlefav = async (_id, isfav) => {
    await axios.put(`${API}/handlefav/${_id}`, { isfav });
    fetchmovie();
  };

  const favoriteMovies = moviedetails.filter((movie) => movie.isfav);

  return (
    <div className="container">
    
      <form className="box" onSubmit={addmovie}>
        <h3>Add Movie</h3>

        <div className="field">
          <label>Movie Name</label>
          <input
            type="text"
            name="moviename"
            value={addForm.moviename}
            onChange={handleAddChange}
            required
          />
        </div>

        <div className="field">
          <label>Director Name</label>
          <input
            type="text"
            name="directorname"
            value={addForm.directorname}
            onChange={handleAddChange}
            required
          />
        </div>

        <div className="field">
          <label>Release Year</label>
          <input
            type="text"
            name="movieyear"
            value={addForm.movieyear}
            onChange={handleAddChange}
            required
          />
        </div>

        <div className="field">
          <label>Movie Genre</label>
          <input
            type="text"
            name="genrename"
            value={addForm.genrename}
            onChange={handleAddChange}
            required
          />
        </div>

        <button type="submit">Add Movie</button>
      </form>

      {editForm._id !== null && (
        <form className="box edit-box" onSubmit={updatemovie}>
          <h3>Edit Movie</h3>

          <div className="field">
            <label>Movie Name</label>
            <input
              type="text"
              name="moviename"
              value={editForm.moviename}
              onChange={handleEditChange}
              required
            />
          </div>

          <div className="field">
            <label>Director Name</label>
            <input
              type="text"
              name="directorname"
              value={editForm.directorname}
              onChange={handleEditChange}
              required
            />
          </div>

          <div className="field">
            <label>Release Year</label>
            <input
              type="text"
              name="movieyear"
              value={editForm.movieyear}
              onChange={handleEditChange}
              required
            />
          </div>

          <div className="field">
            <label>Movie Genre</label>
            <input
              type="text"
              name="genrename"
              value={editForm.genrename}
              onChange={handleEditChange}
              required
            />
          </div>

          <div className="actions">
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditForm(INITIAL_EDIT_FORM)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="section">
        <h3>All Movies ({moviedetails.length})</h3>
        {moviedetails.map((data, index) => (
          <div className="box" key={data._id || index}>
            <p>
              <strong>Movie Name:</strong> {data.moviename}{" "}
              {data.isfav ? "★" : ""}
            </p>
            <p>
              <strong>Director:</strong> {data.directorname}
            </p>
            <p>
              <strong>Year:</strong> {data.movieyear}
            </p>
            <p>
              <strong>Genre:</strong> {data.genrename}
            </p>

            <div className="actions">
              <button onClick={() => handlefav(data._id, !data.isfav)}>
                {data.isfav ? "Remove from Fav" : "Add to Fav"}
              </button>
              <button onClick={() => handleEdit(data)}>Edit</button>
              <button onClick={() => handleDelete(data._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <h3>Favorite Movies ({favoriteMovies.length})</h3>
        <div className="box">
          {favoriteMovies.length === 0 ? (
            <p>No favorite movies yet.</p>
          ) : (
            favoriteMovies.map((fav) => (
              <p key={fav._id}>
                {fav.moviename} ({fav.movieyear})
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;