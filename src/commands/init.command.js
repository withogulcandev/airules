"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitCommand = void 0;
var inquirer_1 = require("inquirer");
var path_1 = require("path");
var file_service_1 = require("../services/file.service");
var logger_1 = require("../utils/logger");
var InitCommand = /** @class */ (function () {
    function InitCommand(config) {
        this.config = config;
    }
    InitCommand.prototype.execute = function () {
        return __awaiter(this, arguments, void 0, function (options) {
            var ruleSets, selectedSet, targetPath, isEmpty, proceed, error_1;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        logger_1.Logger.title('AI Rules Initialization');
                        // Get available rulesets
                        logger_1.Logger.startSpinner('Scanning for available rulesets...');
                        return [4 /*yield*/, file_service_1.FileService.getRuleSets(this.config.rulesDir)];
                    case 1:
                        ruleSets = _a.sent();
                        logger_1.Logger.stopSpinner(true, 'Found available rulesets');
                        if (ruleSets.length === 0) {
                            throw new Error('No rulesets found');
                        }
                        return [4 /*yield*/, this.selectRuleSet(ruleSets)];
                    case 2:
                        selectedSet = _a.sent();
                        targetPath = path_1.default.join(this.config.targetDir, '.cursor', 'rules');
                        return [4 /*yield*/, file_service_1.FileService.isDirectoryEmpty(targetPath)];
                    case 3:
                        isEmpty = _a.sent();
                        if (!(!isEmpty && !options.force)) return [3 /*break*/, 5];
                        return [4 /*yield*/, inquirer_1.default.prompt([{
                                    type: 'confirm',
                                    name: 'proceed',
                                    message: 'Target directory is not empty. Do you want to proceed?',
                                    default: false
                                }])];
                    case 4:
                        proceed = (_a.sent()).proceed;
                        if (!proceed) {
                            logger_1.Logger.warn('Operation cancelled by user');
                            return [2 /*return*/];
                        }
                        _a.label = 5;
                    case 5:
                        // Copy rules
                        logger_1.Logger.startSpinner('Installing rules...');
                        return [4 /*yield*/, file_service_1.FileService.copyRuleSet(selectedSet, targetPath)];
                    case 6:
                        _a.sent();
                        logger_1.Logger.stopSpinner(true, 'Rules installed successfully');
                        logger_1.Logger.success("Rules from '".concat(selectedSet.name, "' have been installed to .cursor/rules/"));
                        if (options.verbose) {
                            logger_1.Logger.info('Installation details:');
                            logger_1.Logger.listItem("Source: ".concat(selectedSet.path));
                            logger_1.Logger.listItem("Target: ".concat(targetPath));
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        logger_1.Logger.stopSpinner(false);
                        logger_1.Logger.error("Initialization failed: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                        throw error_1;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    InitCommand.prototype.selectRuleSet = function (ruleSets) {
        return __awaiter(this, void 0, void 0, function () {
            var selectedName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inquirer_1.default.prompt([{
                                type: 'list',
                                name: 'selectedName',
                                message: 'Select a ruleset to install:',
                                choices: ruleSets.map(function (set) { return ({
                                    name: set.name,
                                    value: set.name
                                }); })
                            }])];
                    case 1:
                        selectedName = (_a.sent()).selectedName;
                        return [2 /*return*/, ruleSets.find(function (set) { return set.name === selectedName; })];
                }
            });
        });
    };
    return InitCommand;
}());
exports.InitCommand = InitCommand;
