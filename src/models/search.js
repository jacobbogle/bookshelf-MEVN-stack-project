// import book from "@/book-objects/book";
import { ref } from "vue";
const api = require("../../api.config");
//import { useRoute  } from 'vue-router'

//google stuff
const googleApiKey = api["API_KEY"];
const googleBooksURL = "https://www.googleapis.com/books/v1";

const SearchBar = () => {
  const state = ref({
    searchTitle: "",
    searchAuthor: "",
    searchISBN: "",
    books: {},
  });
  //makes the querystring and adds the needed api string for the GET of google books api
  //example : [?q=<searchTitle>&key=<googleApiKey>]
  //this needs to be appended to the url
  function urlString() {
    let title = encodeURIComponent(state.value.searchTitle);
    let key = googleApiKey;
    return "?q=" + title + "&key=" + key;
  }

  //returns a json file of related books from searchTitle
  const searchByTitle = async () => {
    try {
      let URLSTRING = urlString();
      await fetch(googleBooksURL + "/volumes" + URLSTRING)
        .then((res) => {
          let response = res.json();
          return response;
        })
        .then((data) => {
          state.value.books = data;
          console.log(data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const postBook = async function (index) {
    let newBook = {
      image: state.value.books.items[index].volumeInfo.imageLinks.thumbnail,
      title: state.value.books.items[index].volumeInfo.title,
      rating: state.value.books.items[index].volumeInfo.averageRating,
      authors: state.value.books.items[index].volumeInfo.authors.join(" "),
      link: state.value.books.items[index].volumeInfo.infoLink,
      description: state.value.books.items[index].searchInfo.textSnippet,
    };
    let response = await fetch("http://localhost:3000/books", {
      method: "POST",
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    console.log(data);
  };

  return {
    state,
    searchByTitle,
    postBook,
  };
};

export default SearchBar;