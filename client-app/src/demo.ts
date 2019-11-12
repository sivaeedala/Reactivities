export interface ICar{
    color:string,
    type:string,
    topSpeed?:number
}

const car1:ICar={
    color:'red',
    type:'BMW'
}

const car2:ICar={
    color:'orange',
    type:'I20',
    topSpeed:100
}

export const Cars=[car1,car2]