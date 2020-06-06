import React from 'react';
import NavPanel from '../../components/navPanel/NavPanel'
import movieService, { IMoviesProps } from '../../services/movies.service';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {DebounceInput} from 'react-debounce-input'

const useStyles = makeStyles({
  table: {
    minWidth: '650px',
  }
});


const SearchMovie = () => {
  const classes = useStyles();
  const [movies, setMovies] = React.useState<IMoviesProps | null>(null);
  const [movieToSearch, setMovieToSearch] = React.useState('');

  React.useEffect(() => {
    movieService.searchByName(movieToSearch).then(resp => {
      if (resp) {
        setMovies(resp);
      }
    });

    movieService.searchById('tt0848228');
  }, [movieToSearch]);


  return (
    <div >
      <NavPanel />
      <DebounceInput
      debounceTimeout={500}
        placeholder="podaj nazwe filmu"
        onChange={event => setMovieToSearch(event.target.value)}
        style={{ all:"initial",color: "white",fontFamily:"Arial",width: "150px",margin:"0 auto",display:"block",backgroundColor:"transparent",border:"none",borderBottom: "1px solid blue",textAlign:"center",height:"30px",marginBottom:"20px",marginTop:"20px"}}
      />
      
      {!!movies?.movies.length &&
            movies?.movies.map(movie => (
              <Card style={{margin:"auto",marginBottom:"15px",width:"200px"}}>
        <CardActionArea>
          <CardMedia>
            <img src={movie.poster}></img>
            </CardMedia>
          <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            
            {movie.year}
          </Typography>
        </CardContent>
         
        </CardActionArea>
      </Card>
            ))
            }



      




      
    </div>
  );
};

export default SearchMovie;