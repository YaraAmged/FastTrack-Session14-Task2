class NewsView {
  constructor(controller) {
    this.controller = controller;
    window.EventMediator.on("news.render", () => this.render());
    this.render();
  }
  render() {
    const target = document.getElementById("newsTarget");
    if (!this.controller.modelSelectedCountry) {
      target.innerHTML = "Select Country";
      return;
    }
    if (this.controller.modelNewsLoading) {
      target.innerHTML = "Loading....";
      return;
    }
    console.log(this.controller.modelNews);
    if (this.controller.modelNews.length == 0) {
      target.innerHTML = "No News Available";
      return;
    }
    const template = document.getElementById("template2").innerHTML;
    const rendered = Mustache.render(template, {
      news: this.controller.modelNews.map((res) => {
        return {
          title: res.title,
          author: res.author,
          publishedAt: res.publishedAt,
          link: res.url,
        };
      }),
    });
    target.innerHTML = rendered;
  }
}
export { NewsView };
