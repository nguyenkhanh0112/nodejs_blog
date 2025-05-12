const Handlebars = require('handlebars')
module.exports = {
      sum:(a,b) => a+b, 
      sortable:(field,sort) =>   {
          const sortType = field === sort.column ? sort.type :'default'
           const icons={
              default: 'fa-solid fa-sort',
              asc:'fa-solid fa-sort-up',
              desc:'fa-solid fa-sort-down'
           }
          const types = {
            default:'desc',
            asc:'desc',
            desc:'asc'
          }

        const icon = icons[sortType];
        const type = types[sort.type];
        const address = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)
        const output = `<a href="${address}">
             <i class="${icon} icon-margin"></i></a>`;
        return new Handlebars.SafeString(output);
      }
    }

