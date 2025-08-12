import React from "react";
import { Heart, Folder, FileText, Info, File } from "lucide-react";

const announcements = [
  {
    icon: <Heart className="text-red-500" size={20} />,
    title: "Lorem Ipsum Dolor Sit",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita similique, consequatur eius commodi.",
  },
  {
    icon: <Folder className="text-yellow-500" size={20} />,
    title: "Lorem Ipsum Dolor Sit",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita similique, consequatur eius commodi.",
  },
  {
    icon: <FileText className="text-gray-700" size={20} />,
    title: "Lorem Ipsum Dolor Sit",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita similique, consequatur eius commodi.",
  },
  {
    icon: <Info className="text-cyan-500" size={20} />,
    title: "Lorem Ipsum Dolor Sit",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita similique, consequatur eius commodi.",
  },
  {
    icon: <File className="text-orange-400" size={20} />,
    title: "Lorem Ipsum Dolor Sit",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita similique, consequatur eius commodi.",
  },
];

const Announcements: React.FC = () => {
  return (
    <div className="w-72 hidden lg:flex flex-col p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Announcements</h2>
      <p className="text-sm text-gray-700 mb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, eaque.
        Recusandae harum facere corporis commodi, placeat in consequuntur
        impedit alias molestias, quidem dolore, sunt delectus quae nobis.
        Tenetur, deleniti vero!
      </p>

      <div className="space-y-5">
        {announcements.map((item, idx) => (
          <div key={idx} className="flex items-start space-x-3">
            <div className="flex-shrink-0">{item.icon}</div>
            <div>
              <h3 className="font-semibold text-sm">{item.title}</h3>
              <p className="text-xs text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
