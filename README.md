# ifthen: support if/then/else/finally branch logic in Javascript callbacks

```js
ifthen.if_(/* condition */)
      .then_(
          // required, called if `condition` 

          function (callback) {
              // callback must be called to trigger completion
              callback();
          })
      .else_(
          // optional; called when `! condition`
          // cannot be specified unless `then_` is

          function (callback) {
              // callback must be called to trigger completion

              callback();
          })
      .finally_(
          // optional, always called after branch completes

          function (err) {
            //
          }
      );
```

