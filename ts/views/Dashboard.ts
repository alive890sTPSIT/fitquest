export function dashboard():HTMLElement{
    const template=document.createElement("template");

    template.innerHTML=`
        
    `;
    const dashboard=template.content.firstElementChild as HTMLElement;


    return dashboard;
}