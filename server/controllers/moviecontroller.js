const Movie = require("../models/movieModel");

const addmovie = async (req, res) => {
  
    const { moviename, directorname, movieyear, genrename } = req.body;
    const newMovie = new Movie({ moviename, directorname, movieyear, genrename });
    await newMovie.save();
    res.status(200).json(newMovie);
};

const fetchmovie = async (req, res) => {
  
    const movies = await Movie.find();
    res.status(200).json(movies);
  
};

const updatemovie = async (req, res) => {
  const { _id } = req.params; 
  const { moviename, directorname, movieyear, genrename } = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(
      _id,
      { moviename, directorname, movieyear, genrename },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedMovie);
  
};

const deleteMovie = async (req, res) => {
  const { _id } = req.params;
 
    await Movie.findByIdAndDelete(_id);
    res.status(200).json({ message: "User deleted successfully" });
  
};

const favmovie = async (req,res) => {
    const { _id } = req.params;
    const { isfav } = req.body;
  
        const favbutton = await Movie.findByIdAndUpdate(
          _id,
          {isfav:isfav},
          { new:true}
         )
          res.status(200).json(favbutton);
 
    }


module.exports = { addmovie, fetchmovie, updatemovie,deleteMovie,favmovie};