let {log} = console
console.log('file execution started...')

const postings = [
	{
		serial: '001',
		imageTitle: 'img1.jpg',
		imageName: 'Firt Image',
		comments: [
			{serial: '101', Comment: 'I am a comment 01', Postid: '101'},
			{serial: '102', Comment: 'I am a comment 02', Postid: '101'},
			{serial: '103', Comment: 'I am a comment 03', Postid: '101'},
		],
	},
	{
		serial: '002',
		imageTitle: 'img2.jpg',
		imageName: 'Second Image',
		comments: [
			{serial: '201', Comment: 'I am a comment 11', Postid: '101'},
			{serial: '202', Comment: 'I am a comment 12', Postid: '101'},
			{serial: '203', Comment: 'I am a comment 13', Postid: '101'},
		],
	},
]

const createTemplate = Handlebars.compile
const attachHelper = (...input) => Handlebars.registerHelper(...input)
const render = (...input) => new Handlebars.SafeString(...input)

const postsTemplate = createTemplate(
	`
  <div>
    {{#each postings}}
      {{displaypost}}
    {{/each}}
  </div>
  `
)

const commentTemplate = createTemplate(
	`
  {{#each comments}}
    {{displayComment}}
  {{/each}}
  `
)

attachHelper('displayComment', function () {
	log({comment: this})

	const response = `<label> ${this.Comment} </label> <br />`

	return render(response)
})

attachHelper('displaypost', function () {
	// log({post: this})
	const commentHtml = commentTemplate({comments: this.comments})

	var response = `
  <div class="card">
    <img class="card-img-top" height="400" width="400" src="${this.imageTitle}" style='width:150px; height:150px' alt="Card image">
    <div class="card-body">
      <h4 class="card-title"> ${this.imageName} </h4>
      <p class="card-text">Comments</p>
      <form method="get" action="saveComment">
        <input type="text" name="Comment"/>
        <input type="hidden" name="Postid" value='${this.serial}'/>
        <button type="submit">
          <i class="fas fa-comments-dollar">Submit</i>
        </button>
      </form>
      ${commentHtml}
  </div>
  `
	//Please set path of your images accordingly
	return render(response)
})

const postsHtml = postsTemplate({postings})
// console.log({postsHtml})

document.getElementById('demo').innerHTML = postsHtml
