import Tabs from "../../components/./tabs/tabs";


export default {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export const Primary = {
  render: () => {
    const TABS = [
      {
        value: 'html',
        label: "HTML",
        content: "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser."
      },
      {
        value: 'css',
        label: "CSS",
        content: "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML."
      },
      {
        value: 'javascript',
        label: "JavaScript",
        content: "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS."
      }
    ]
    return <div className="wrapper">
      <Tabs items={TABS} defaultValue="css" />
      <Tabs items={TABS} defaultValue="css" />
      <Tabs items={TABS} defaultValue="css" />
      <Tabs items={TABS} defaultValue="css" />
    </div>
  }
};
