/// <reference path="../../../../typings/main.d.ts" />
"use strict";
var mongoose = require('mongoose');
var _todoSchema = {
    todoMessage: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.Schema(_todoSchema);
//# sourceMappingURL=todo-model.js.map