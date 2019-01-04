'use strict';

const notes = [
  { 'id': 1000, 'title': '5 life lessons...', 'tagId': 1, 'tagName': 'foo' },
  { 'id': 1005, 'title': '100 ways a cat...', 'tagId': 2, 'tagName': 'bar' },
  { 'id': 1005, 'title': '100 ways a cat...', 'tagId': 1, 'tagName': 'foo' },
  { 'id': 1007, 'title': '17 things dogs...', 'tagId': 3, 'tagName': 'baz' }
];
  
// /* ========== HYDRATE ========== */
  
// const hydrated = {};
  
// // notes.forEach((note) => {
// //   if (!(note.id in hydrated)) {
// //     hydrated[note.id] = {
// //       id: note.id,
// //       title: note.title,
// //       tags: []
// //     };
// //   }
// // });

// notes.reduce((accum, note) => {
//   if (!(note.id in hydrated)) {
//     hydrated[note.id] = {
//       id: note.id,
//       title: note.title,
//       tags: []
//     };
//   }
// }, hydrated);
  
// notes.forEach((note) => {
//   hydrated[note.id].tags.push({
//     id: note.tagId,
//     name: note.tagName
//   });
// });
// const results = [];
  
// console.log(JSON.stringify(hydrated, null, 2));
  
// Object.keys(hydrated).forEach((id) => {
//   results.push(hydrated[id]);
// });
  
// console.log(JSON.stringify(results, null, 2));

const newNotes = notes.map(note => {
  const {id, title} = note;
  return {id, props: {title, tags: []}};
})
  .filter((note, index, self) => self.indexOf(note) === index);
//   .reduce((accum, note) => accum.push({id: note, title: }), [])

console.log(newNotes);