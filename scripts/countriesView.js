class CountriesView {
  constructor(controller) {
    this.controller = controller;
    window.EventMediator.on("countries.render", () => this.render());
    this.render();
  }
  render() {
    const target = document.getElementById("countriesTarget");
    if (this.controller.modelCountriesLoading) {
      target.innerHTML = "Loading....";
      return;
    }
    const template = document.getElementById("template").innerHTML;
    const rendered = Mustache.render(template, {
      countries: this.controller.modelCountries.map((res, i) => {
        return {
          imageSrc: res.flags.png,
          countryName: res.name.common,
          population: res.population,
          region: res.region,
          capital: res.capital[0],
          cca2: res.cca2,
        };
      }),
    });
    target.innerHTML = rendered;
    $(".owl-carousel").owlCarousel({
      margin: 10,
      nav: true,
      items: 4,
      dots: false,
      slideBy: 4,
    });
    const controller = this.controller;
    $(".card").on("click", function () {
      controller.handleSelectCountry(this);
    });
  }
}
export { CountriesView };
