export interface IGood {
    id?: number
    title: string;
    price: number;
    discount: number;
    description: string;
    specifications: ISpecification[];
    goodImages?: IGoodImages[]
}

export interface ISpecification {
    id?: number
    title: string;
    value: string;
}

export interface IGoodImages{
    id: number
    path: string
    title: string
}