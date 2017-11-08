function(doc) {
  if(doc.type === 'Actor'){
	  emit(doc.movies, doc);
  }
};