# Info

Node API for working with spatial datasets in Postgres. Built with Express, Auth0, and TypeScript.  
It has built in authentication using Auth0, and supports reading and writing geospatial datasets.  

## Requirements

1. Clone the repo, navigate to the root directory and install via npm. 

```bash
npm install
```

2. Import the sample .sql database into your Postgres environment. 

## Usage

1. Create the respective variables in your `.env` file
```bash
PORT=9000
AUTH0_DOMAIN=
AUTH0_AUDIENCE=
DB_SERVER=
DB_PORT=
DB_DBNAME=
DB_USERNAME=
DB_PASSWORD=
```

2. Run the development server using the `dev` script
```bash
npm run dev
```

## API Endpoints

Sample json data for creating/updating data is included in the `/tests` folder.

Pass a valid Auth0 token in the header of all requests to the API endpoints.  
`Authentication: Bearer <token>`

#### Endpoint - POIs - Points of interest data

Get all pois for user  
`GET /api/v1/spatial/pois`

Get all pois for user as geojson feature collection  
`GET /api/v1/spatial/pois?f=geojson`

Get a single poi using an id parameter  
`GET /api/v1/spatial/pois/:id`

Create a new poi  
`POST /api/v1/spatial/pois`

Update a poi using an id parameter  
`PUT /api/v1/spatial/pois/:id`

Remove a poi using an id parameter  
`DELETE /api/v1/spatial/pois/:id`

#### Endpoint - Tracks - Polyline route track data

Get all tracks for user  
`GET /api/v1/spatial/tracks`

Get a single route using an id parameter  
`GET /api/v1/spatial/tracks/:id`

Create a new route  
`POST /api/v1/spatial/tracks`

Update a route using an id parameter  
`PUT /api/v1/spatial/tracks/:id`

Remove a route using an id parameter  
`DELETE /api/v1/spatial/tracks/:id`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
