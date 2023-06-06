class Controller {
  constructor(model) {
    this.model = model;
    window.EventMediator.on("countries.loaded", (data) => {
      this.model.countries = data.filter((country) => country.capital);
      this.model.countriesLoading = false;
      window.EventMediator.emit("countries.render");
    });
    window.EventMediator.on("news.loaded", (data) => {
      this.model.news = data;
      this.model.newsLoading = false;
      window.EventMediator.emit("news.render");
    });

    this.fetchCountries();
  }
  get modelCountriesLoading() {
    return this.model.countriesLoading;
  }
  get modelCountries() {
    return this.model.countries;
  }
  get modelSelectedCountry() {
    return this.model.selectedCountry;
  }
  get modelNews() {
    return this.model.news;
  }
  get modelNewsLoading() {
    return this.model.newsLoading;
  }

  handleSelectCountry(target) {
    this.model.selectedCountry = target.id;
    this.model.newsLoading = true;
    $(".card").each(function () {
      $(this).removeClass("active");
    });
    $(target).addClass("active");
    this.fetchNews();
  }
  fetchCountries() {
    $.ajax({
      url: "https://restcountries.com/v3.1/all",
      success: function (data) {
        window.EventMediator.emit("countries.loaded", data);
      },
    });
  }
  fetchNews() {
    this.model.newsLoading = true;
    window.EventMediator.emit("news.render");

    $.ajax({
      url: `https://newsapi.org/v2/top-headlines?country=${this.model.selectedCountry}&category=business&apiKey=39ba2334ea5b43c39f913b2d215903d1`,
      success: function (data) {
        window.EventMediator.emit("news.loaded", data.articles);
      },
    });
  }
}
export { Controller };
