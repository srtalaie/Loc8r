/* GET home page. */
const about = (req, res) => {
  res.render('generic-text', { 
    title: 'About Loc8r',
    content: 'Loc8r was created to help people find place to sit down and get a bit of work done \n \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit eleifend arcu. Cras pellentesque dolor sapien, sit amet fringilla orci dignissim nec. Sed quis tempus dolor. Sed nibh ligula, iaculis ut mi non, ullamcorper bibendum neque. Nullam vitae ex orci. Integer laoreet faucibus gravida. Praesent auctor neque non vehicula tincidunt. In ligula purus, vestibulum ac eros eu, blandit vestibulum odio. Cras maximus tortor in nulla sagittis aliquet. Donec congue lorem erat, ac tincidunt mauris blandit suscipit. \n Integer magna urna, efficitur ut semper non, tincidunt non mi. Donec eu nulla eget lorem egestas sollicitudin ut a odio. Phasellus ut finibus tortor. Phasellus vehicula finibus rhoncus. Donec tristique, lacus ut lobortis molestie, massa orci lobortis urna, eget vestibulum augue est sed lectus. Morbi quis quam non erat sollicitudin dignissim. Maecenas vel dui tincidunt, pretium magna vel, condimentum neque. Mauris at sapien mollis, hendrerit libero et, sagittis magna. Phasellus a massa a mi elementum rutrum vitae eu odio. Nullam semper lacus eu magna vehicula, vel consectetur mauris pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.' 
  });
}

module.exports = {
    about
};