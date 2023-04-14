# CultureNet

_CultureNet_ is a web application designed to provide users with a platform to review, log, and network around movies, TV shows, music, and books. The main purpose of the project is to enable users to discover new entertainment content, share their opinions and insights, and connect with like-minded individuals.

- _Date Created_: 27 Feb 2023
- _Last Modification Date_: 13 Apr 2023
- _Git URL (Frontend)_: https://git.cs.dal.ca/andharia/csci5709-group11/-/tree/main
- _Git URL (Backend)_: https://git.cs.dal.ca/andharia/csci5709-group11-backend/-/tree/main
- _Deployed App URL_: https://csci5709-group11.netlify.app/

## Authors

- [Monil Andharia](andhariamonil@dal.ca) - _Full Stack Developer_
- [Nikhil Panikkassery](nk561034@dal.ca) - _Full Stack Developer_
- [Pranay Raycha](pr746594@dal.ca) - _Full Stack Developer_
- [Rishi Vasa](rishi.vasa@dal.ca) - _Full Stack Developer_
- [Ronil Patel](ronil.patel@dal.ca) - _Full Stack Developer_

## Getting Started

### Prerequisites

To have a local copy of this lab / assignment / project up and running on your local machine, you will first need to install the following software/libraries / plug-ins

```
Node.js
```

See the following section for detailed step-by-step instructions on how to install this software / libraries / plug-ins

### Installing

1. Install [Node.js](https://nodejs.org/en/download/) from the following link:

2. Clone the git repository.

3. Checkout to the `main` branch.

4. Open the terminal and run the following commands:

#### Frontend

```bash
> npm install
> npm start
```

#### Backend

```bash
> npm install --legacy-peer-deps
> npm server-local.js
```

## Deployment

### Auto deployment (CI/CD)

1. Login to [Netlify](https://app.netlify.com/)

2. Create a new site.

3. Upon pushing a new commit on `main` branch, the application will be automatically published to https://csci5709-group11.netlify.app/

### Manual deployment (Frontend)

1. Login to [Netlify](https://app.netlify.com/).

2. Click "Add a new site" on Netlify

3. Click "Drop manually"

4. Run "npm install" command in terminal in Visual Studio Code in local.

5. Run "npm run build" command in terminal in Visual Studio Code in local.

6. Drag folder "build" from local project folder and drop it in Netlify.

7. Click Deploy Site.

8. Netlify should provide url for the application.

### Manual deployment (Backend)

1. Login to [Netlify](https://app.netlify.com/).

2. Run following commands through project terminal
   - npm install --legacy-peer-deps
   - npm install netlify-cli -g
   - npm run build

3.Run following command with environment variables id and token received from netlify.
-netlify deploy --dir "build" --auth $token --site $id --prod 4. Netlify should provide url for the application.

## Built With

- [Node.js](https://nodejs.org/en/) - JavaScript runtime environment

- [Express.js](https://expressjs.com/) - Web framework for NodeJS

- [MUI](https://mui.com/) - Web component library

- [Mongoose](https://mongoosejs.com/docs/) - MongoDB library

- [Nodemailer](https://nodemailer.com/usage/using-gmail/) - Node library for email sending via OAuth2

- [MongoDB] (https://www.mongodb.com/)- Used for data storage

## Sources Used

### For Deployment on Netlify

Backend code needed to be deployed as serverless-http functions on Netlify. I referred to the following video to learn and implement the deployment.

- [Owen Conti](https://www.youtube.com/watch?v=hQAu0YEIF0g)

### Login.jsx

_Line 34_

```
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
```

The code was adapted from [Regexr](https://regexr.com/3e48o)

_Line 35_

```
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
```

The code was adapted from [Stack Overflow](https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a)

### UserProfile.jsx

_Line 153_

```
const nameRegex = /\b([A-Za-zÀ-ÿ][-,a-z. ']+[ ]*)+/g;
```

The code was adapted from [Regexr](https://regexr.com/3f8cm)

### Registration.jsx

_Lines 32-34_

```
const Alert = forwardRef(function Alert(props, ref) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
```

_Lines 160-164_

```
<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
    {snackbarMessage}
    </Alert>
</Snackbar>
```

### Navbar.jsx

_Lines 29-67_

```
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
```

The code was adapted from [MUI official documentation](https://mui.com/material-ui/react-snackbar/)

### search.js

Used references [1] and [2] at lines 13,18,26 to understand how to filter results from mongodb using mongoose.

### searchContentCard.js

Used Card, CardMedia components from MUI package [3]

### searchContentGrid.js

Used Grid, ThemeProvider, Tooltip,Stack,Pagination components from MUI package [3]

### SearchedBooks.js

Used Divider, Container, Typography components from MUI package [3]

### SearchedContent.js

Used Backdrop logic for Backdrop component from lines 29 to 35 from @mui(material UI) package for making backdrop loader[4].
Used Backdrop,CircularProgress, createTheme,Divider,responsiveFontSizes,ThemeProvider, Typography, components from @mui(material UI) package for making UI componenets[4].

### SearchedMovies.js

Used Container, Divider, Typography components from @mui(material UI) package for making UI componenets[4].

### SearchedUsers.js

Used Container, Divider, Typography components from @mui(material UI) package for making UI componenets[4].

### contentControl.js

Used Backdrop logic for Backdrop component from lines 18 to 24 from @mui(material UI) package for making backdrop loader[4].
Used Clear,DownloadDone,Visibility, VisibilityOff, Backdrop,Button,Stack,Tooltip,CircularProgress components from @mui(material UI) package for making UI componenets[4].

### WatchListContent.js

Used Backdrop logic for Backdrop component from lines 25 to 31 from @mui(material UI) package for making backdrop loader[4].
Used Backdrop,Button, CircularProgress, createTheme,Divider,responsiveFontSizes,ThemeProvider,Typography components from @mui(material UI) package for making UI componenets[4].

### WatchedContent.js

Used Backdrop logic for Backdrop component from lines 25 to 31 from @mui(material UI) package for making backdrop loader[4].
Used Backdrop,Button, CircularProgress, createTheme,Divider,responsiveFontSizes,ThemeProvider,Typography components from @mui(material UI) package for making UI componenets[4].

### SearchedMusic.js

Used Divider, Container, Typography components from MUI package [3]

### Images used

Used image https://cdn.pixabay.com/photo/2016/11/03/14/18/stamp-1794352_960_720.png for entities on pages.[5]

### MovieCard.js

_Lines 6-40_

```
Grid item xs={12} sm={6} md={4}>
      <Card onClick={() => onMovieClick(movie._id)}>
        <CardMedia
          component="img"
          height="300"
          image={movie.image}
          alt={movie.title}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            height: "17vh",
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2" noWrap>
                {movie.title}
              </Typography>
              <Typography noWrap>Release Date: {movie.dateReleased}</Typography>
            </Box>
            <Box sx={{ marginTop: "auto" }}>
              <Rating
                name={`rating-${movie._id}`}
                value={movieRatings[movie._id] || 0}
                precision={0.5}
                max={5}
                readOnly
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>



```

The code was adopted from [Material UI](https://mui.com/material-ui/react-card/)

### ListOfMovies.js

_Lines 100-116_

```
{!isSmallScreen && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}
            />
          )}
          {isSmallScreen && (
            <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
              />
              </Grid>
          )}

```

The code was adopted from [Stack Overflow](https://stackoverflow.com/questions/61672658/how-to-adjust-react-material-ui-pagination-spacing-width-on-smaller-screens)

### MovieDetail.js

_Lines 96-129_

```
<Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="movie">
            {title.charAt(0)}
          </Avatar>
        }
        title={title}
        subheader={`Release Date: ${formattedDate}`}

      />
      <CardMedia className={classes.media} image={image} title={title} style={{ width: '100%', objectFit: 'cover' }} />
      <CardContent>

        <Typography variant="body2" color="textSecondary" component="p">
        Genres: {genres.map(genre => genre.name).join(', ')}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Director:</b> {director}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Overview:</b> {description}
        </Typography>
        <Box sx={{ marginTop: "auto" }}>
                      <Rating
                        name={`rating-${movie._id}`}
                        value={userRating}
                        precision={0.5}
                        max={5}
                        onChange={(event, value) => handleRatingChange(event, value, movie._id)}
                      />
                    </Box>
      </CardContent>
    </Card>

```

### AddMovie.js, AddBook.js, AddMusic.js

```
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "username": email, "password": password })
    };
    const response = await fetch('PROCESS_ENV.REACT_BACKEND', requestOptions);
    const apiResponse = await response.json();

    if (apiResponse.message === "Login success!") {
        navigate("/AddMovie");
    } else {
        alert(apiResponse.message);
    }

```

The code above was created by adapting the code in [React + Fetch - HTTP POST Request Examples](https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples) as shown below:

```

async componentDidMount() {
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    const response = await fetch('https://reqres.in/api/posts', requestOptions);
    const data = await response.json();
    this.setState({ postId: data.id });
}

```

## Acknowledgments

- [Gitlab docs](https://docs.gitlab.com/ee/ci/examples/deployment/index.html#storing-api-keys) for providing _yml_ to deploy code to Heroku

- [React documentation](https://reactjs.org/docs/create-a-new-react-app.html) for guiding how to create first react application

- [MUI](https://mui.com/) for providing better UI components

- [Mongoose](https://mongoosejs.com/docs/) for connecting to MongoDB

- [Nodemailer](https://nodemailer.com/usage/using-gmail/) for sending password reset code to email

- [“mongoose "Find" with multiple conditions” Stack Overflow](https://stackoverflow.com/questions/33627238/mongoose-find-with-multiple-conditions) for finding aggregates

- [“How I can use "LIKE" operator on mongoose?” Stack Overflow](https://stackoverflow.com/questions/43729199/how-i-can-use-like-operator-on-mongoose) for using `LIKE` operator on mongoose

- [“Stunning royalty-free images & royalty-free stock” pixabay](https://pixabay.com/) for free licensed images

- The Professor

- All the TAs of this course
