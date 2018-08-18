export default function(){
  // Add your transitions here, like:
  this.transition(
    this.toRoute(()=>true),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
