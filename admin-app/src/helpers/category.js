export const CreateCategoryList = (categories, options = []) => {
    for (let cat of categories) {
        options.push({ value: cat._id, name: cat.name, parentId: cat.parentId, type: cat.type })
        if (cat.children.length > 0) {
            CreateCategoryList(cat.children, options)
        }
    }
    return options
}