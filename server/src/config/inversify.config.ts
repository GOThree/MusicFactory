import inversify = require('inversify');

var kernel = new inversify.Kernel();

export = kernel

/*
example usage:

1. import all the models in the beginning like 
import {Run} from './source/services/Run'

2. Register all the models and the interfaces with the kernel
kernel.bind(new inversify.TypeBinding<RunInterface>("RunInterface", <any>Run));

3. Use DI with your classes with the @inject decorator
import inversify = require('inversify');

@inversify.Inject("RunInterface","JumpInterface")
class Athlete implements AthleteInterface{
    public runAction : RunInterface;
    public jumpAction : JumpInterface;
    
    constructor(RunInterface:RunInterface, JumpInterface:JumpInterface){
        this.runAction = RunInterface;
        this.jumpAction = JumpInterface;
    }
} 
*/
