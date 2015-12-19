###<%= name %>

<%= description %>

####Medical Information

Your medical information should be specified in a JSON file using the following schema:

```json
{
	"name": "John Doe",
	"allergies": "Penicillin",
	"bloodType": "B+",
	"emergencyContact": {
		"name": "Jane Doe",
		"phone": "(800) 555-1212",
		"relationship": "Spouse"
	}
}
```

The JSON file should be uploaded to a location that is accessible via URL (e.g. Azure Blob Storage).

####Build

Clone the git repository.

Install the package dependencies.

```javascript
npm install
```

Build the Web Tile, specifying the URL from which to get the data.

```javascript
gulp --url <URL>
```

The webtile will be generated in the 'out' folder.

####Installation

Email the Web Tile to yourself, then open the attachment on your phone with the Microsoft Health application.
