async function loadTree() {
  const response = await fetch('family.json');
  const data = await response.json();
  const treeDiv = document.getElementById('tree');
  treeDiv.appendChild(renderMember(data));
}

function renderMember(member) {
  const li = document.createElement('li');
  const div = document.createElement('div');
  div.className = 'member';

  if (member.avatar) {
    const img = document.createElement('img');
    img.src = member.avatar;
    div.appendChild(img);
  }
  div.appendChild(document.createTextNode(member.name));

  li.appendChild(div);

  // spouse
  if (member.spouse) {
    const spouseDiv = document.createElement('div');
    spouseDiv.className = 'member';
    if (member.spouse.avatar) {
      const img = document.createElement('img');
      img.src = member.spouse.avatar;
      spouseDiv.appendChild(img);
    }
    spouseDiv.appendChild(document.createTextNode(member.spouse.name));
    li.appendChild(spouseDiv);
  }

  // children
  if (member.children && member.children.length > 0) {
    const ul = document.createElement('ul');
    member.children.forEach(child => {
      // nếu con là nữ thì chỉ hiển thị spouse và children, không lặp sâu
      if (child.gender === 'female') {
        const childLi = document.createElement('li');
        const childDiv = document.createElement('div');
        childDiv.className = 'member';
        if (child.avatar) {
          const img = document.createElement('img');
          img.src = child.avatar;
          childDiv.appendChild(img);
        }
        childDiv.appendChild(document.createTextNode(child.name));
        childLi.appendChild(childDiv);

        if (child.spouse) {
          const spouseDiv = document.createElement('div');
          spouseDiv.className = 'member';
          if (child.spouse.avatar) {
            const img = document.createElement('img');
            img.src = child.spouse.avatar;
            spouseDiv.appendChild(img);
          }
          spouseDiv.appendChild(document.createTextNode(child.spouse.name));
          childLi.appendChild(spouseDiv);
        }

        // hiển thị children nhưng không lặp sâu
        if (child.children && child.children.length > 0) {
          const subUl = document.createElement('ul');
          child.children.forEach(grandchild => {
            subUl.appendChild(renderMember(grandchild));
          });
          childLi.appendChild(subUl);
        }

        ul.appendChild(childLi);
      } else {
        ul.appendChild(renderMember(child));
      }
    });
    li.appendChild(ul);
  }

  const ulWrapper = document.createElement('ul');
  ulWrapper.appendChild(li);
  return ulWrapper;
}

loadTree();
